import React from "react";
import Navbar from "../shared/Navbar";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const submit = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phoneNumber", String(data.phoneNumber));
    formData.append("password", data.password);
    formData.append("role", data.role);

    if (data.profilePhoto && data.profilePhoto[0]) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }
    // console.log(data.profilePhoto)
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // console.log("res data", res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={handleSubmit(submit)}
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              placeholder="Fullname"
              type="text"
              {...register("fullName", { required: true })}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              placeholder="Email"
              type="text"
              {...register("email", { required: true })}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              placeholder="Phone Number"
              type="text"
              {...register("phoneNumber", { required: true })}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              placeholder="password"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <Label>Role</Label>
          <div className=" flex my-3 items-center justify-between">
            <div className="flex gap-2">
              <Input
                className="h-4 w-4"
                type="radio"
                value="applicant"
                id="r1"
                {...register("role", { required: true })}
              />
              <Label htmlFor="r1">Applicant</Label>

              <Input
                type="radio"
                className="h-4 w-4"
                value="recruiter"
                id="r2"
                {...register("role", { required: true })}
              />
              <Label htmlFor="r2"> Recruiter</Label>
            </div>

            <div className="w-1/2">
              <Input
                className="cursor-pointer"
                type="file"
                accept="image/*"
                {...register("profilePhoto")}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              signup
            </Button>
          )}

          <div className="my-3 text-sm">
            <span>
              already have an account?{" "}
              <Link className="text-orange-500">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
