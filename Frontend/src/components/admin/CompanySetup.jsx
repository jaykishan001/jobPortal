import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { toast } from "sonner";
import useGetCompanyById from "../../hooks/useGetCompanyById";
import { useSelector } from "react-redux";

function CompanySetup() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch the company data
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((state) => state.company);

  // Use React Hook Form
  const { register, handleSubmit, reset } = useForm();

  // Reset form only when singleCompany data is available
  useEffect(() => {
    if (singleCompany) {
      reset({
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        logo: singleCompany?.logo || null,
      });
    }
  }, [singleCompany, reset]);

  // Submit handler
  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("website", data.website);
    formData.append("location", data.location);

    if (data?.logo && data.logo[0]) {
      formData.append("logo", data.logo[0]);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Conditionally render form only when company data is available
  if (!singleCompany) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin mr-2 h-8 w-8" /> Loading company data...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input type="text" name="name" {...register("name")} />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                {...register("description")}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input type="text" name="website" {...register("website")} />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" {...register("location")} />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" {...register("logo")} />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
