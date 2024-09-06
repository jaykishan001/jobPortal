import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import useGetSingleJob from "../hooks/useGetSingleJob";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/constant";

function JobDescription() {
  const isApplied = false;
  const param = useParams();
  const jobId = param?.id;
  const { singleJob } = useSelector((state) => state.job);
  const {user} = useSelector(state=> state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    const getsingleJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(response);
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
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
          <span className="pl-4 font-normal text-gray-800">{singleJob.experience} Yr</span>
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
