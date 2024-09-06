import React from 'react'
import Navbar from '../shared/Navbar'
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { USER_API_ENDPOINT } from "../../utils/constant";
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setLoading } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';

function Login() {

  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {loading} = useSelector(store => store.auth)
  const submit = async(data) => {
    try {
      dispatch(setLoading(true));
      // console.log(data)
      const res = await axios.post(`${USER_API_ENDPOINT}/login` , data,{
        headers: {
          "Content-Type": "application/json",   
        },
        withCredentials: true,
      });
      // console.log("Login page response", res);
      if(res.data.success) {
        dispatch(setAuthUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form  className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={handleSubmit(submit)}>
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              placeholder="Email"
              type="text"
              {...register("email", { required: true })}
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
            placeholder="password"
            type="pasword"
            {...register("password", {required: true})}
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
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : 
                      <Button className="w-full my-2">Login</Button>
          }
          <div className='text-sm'>
          <span>don't have an account? <Link className='text-orange-500'>Sign Up</Link></span>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login