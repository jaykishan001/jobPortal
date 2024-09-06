import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
// import { toast } from 'sonner'

import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader, Loader2 } from 'lucide-react'
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../redux/authSlice";
import { USER_API_ENDPOINT } from "../utils/constant";

function UpdateProfileDialog({ open, setOpen }) {

 const {user} = useSelector((state) => state.auth)
 const dispatch = useDispatch()

  
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
        fullName : user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile.skills?.join(',') ||  "",
        file: user?.profile?.resume || ""
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("file", file)
  }



  const submitForm =  async (data) => {
      console.log(data);
      const skillsArray = data?.skills.split(",").map(skill => skill.trim())
      
      const formData = new FormData();
      formData.append("fullName", data.fullName)
      formData.append("phoneNumber", data.phoneNumber)
      formData.append("bio", data.bio)
      formData.append("skills", skillsArray)
    
      if(data.file) {
          formData.append("file", data.file)
      }
      try {
        setLoading(true)
        const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        
        
        if(res.data.success) {
            dispatch(setAuthUser(res.data.user))
            toast.success(res.data.message);
        }
        setOpen(false)
        // console.log(formData);
    } catch (error) {
        console.log(error)
        toast.error(error.response.message);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-col-4 items-center gap-4 ">
                <Label htmlFor="name" className="text-left">
                  FullName
                </Label>
                <Input id="name" className="col-span-3" {...register("fullName")} />
              </div>

              <div className="grid grid-col-4 items-center gap-4 ">
                <Label htmlFor="number" className="text-left">
                  Number
                </Label>
                <Input
                  id="number"
                  className="col-span-3"
                  {...register("phoneNumber")}
                />
              </div>
              <div className="grid grid-col-4 items-center gap-4 ">
                <Label htmlFor="bio" className="text-left">
                  Bio
                </Label>
                <Input id="bio" 
                className="col-span-3" 
                {...register("bio")} />
              </div>
              <div className="grid grid-col-4 items-center gap-4 ">
                <Label htmlFor="skills" className="text-left">
                  Skills
                </Label>
                <Input
                  id="skills"
                  placeholder = "e.g, HTML, CSS , JavaScript"
                  className="col-span-3"
                  {...register("skills")}
                />
              </div>
              <div className="grid grid-col-4 items-center gap-4 ">
                <Label htmlFor="file" className="text-left">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="resume"
                  type="file"
                  className="col-span-3"
                  accept="application/pdf"
                  onChange= {handleFileChange}
                />
              </div>
            </div>
            <DialogFooter>
               {
                loading ? 
                <Button className="w-full my-4"><Loader className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button> :
                <Button type="submit" className="w-full my-4">Update</Button>
               }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
