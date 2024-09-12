import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "../hooks/useGetAllAppliedJobs";

const Skills = ["Html", "css", "javascript", "Express"];

function Profile() {
  const [open, setOpen] = useState(false)
  const isResume = true;
  const {user} = useSelector(state => state.auth)
  useGetAllAppliedJobs();
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border boder-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage className="rounded-full object-fill" src= {user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="text-right">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2 my-1 ">
            {Skills.length != 0 ? (
              Skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>Not applicable</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>

          {isResume ? (
            <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">
              {user?.fullName}
            </a>
          ) : (
            <span>Not avaliable</span>
          )}
        </div>
      </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1 className="font-bold text-lg my-5 ">Applied Jobs</h1>
          {/* {Application table} */}
          <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
