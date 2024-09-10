import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/constant";

function JobDescription() {
  
  const { singleJob } = useSelector((state) => state.job);
  const {user} = useSelector((state) => state.auth)
  const isInitiallyApplied = singleJob?.applications?.some(singleUser => singleUser?.applicant == user?._id) || false ;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  
  console.log("User id", user?._id)
  const param = useParams();
  const jobId = param?.id;
  const dispatch = useDispatch();

  const applyJobHandler = async() => {
    try {
      const res = await axios(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,{
        withCredentials: true
      })
    console.log("respones ", res.data);

      if(res.data.success) {
        setIsApplied(true) //update the local state
        const updateSingleJob = {...singleJob, applications: [...singleJob.applications, {applicant: user?._id}]}
        dispatch(setSingleJob(updateSingleJob)); // helps us to real time  ui update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const getsingleJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        // console.log(response);
        if (response.data.success) {
          console.log(response)
          dispatch(setSingleJob(response.data.job));
         { setIsApplied(response.data.job.applications.some(application => application?.applicant === user?._id))}
          console.log(isApplied)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getsingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="font-bold text-xl">{singleJob?.company?.name}</h1>
          <div className="flex item-center mt-4">
            <Badge className="text-blue-700 font bold" variant="ghost">
              12 position
            </Badge>
            <Badge className="text-red-500 font bold" variant="ghost">
              part time
            </Badge>
            <Badge className="text-purple-700 font bold" variant="ghost">
              24 lpa
            </Badge>
            <Badge className="text-green-500 font bold" variant="ghost">
              Delhi
            </Badge>
          </div>
        </div>

        <Button 
          onClick = {isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied 
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        {singleJob?.discription}
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{""}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "} 
          <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} Yr</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">{singleJob?.applications.length <= 0 ? "0" : singleJob?.applications.length}</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
