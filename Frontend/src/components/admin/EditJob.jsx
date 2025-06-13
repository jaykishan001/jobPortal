import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { JOB_API_ENDPOINT } from "../../utils/constant";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/${id}`, {
          withCredentials: true,
        });
        const job = res.data.job;
        reset(job); // set all values at once
        setValue("companyId", job.companyId._id); // manually setting companyId
      } catch (error) {
        toast.error("Failed to fetch job details");
      }
    };
    fetchJob();
  }, [id, reset, setValue]);

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setValue("companyId", selectedCompany._id);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_ENDPOINT}/${id}`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Job updated successfully!");
        navigate("/admin/jobs");
      }
    } catch (err) {
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <InputBlock label="Title" name="title" register={register} />
            <InputBlock label="Description" name="description" register={register} />
            <InputBlock label="Requirements" name="requirements" register={register} />
            <InputBlock label="Salary" name="salary" register={register} />
            <InputBlock label="Location" name="location" register={register} />
            <InputBlock label="Job Type" name="jobType" register={register} />
            <InputBlock label="Experience" name="experience" register={register} />
            <InputBlock label="Number of Positions" name="position" register={register} type="number" />

            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company.name.toLowerCase()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

const InputBlock = ({ label, name, register, type = "text" }) => (
  <div>
    <Label>{label}</Label>
    <Input
      type={type}
      name={name}
      {...register(name)}
      className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
    />
  </div>
);

export default EditJob;
