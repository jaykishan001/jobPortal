import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function AdminJobsTable() {
  
  const { allAdminJobs, seachJobByText } = useSelector((state) => state.job);
  const [filterJob, setfilterJob] = useState(allAdminJobs)
  const navigate = useNavigate()

  useEffect(() => {
    if(allAdminJobs?.length) {
        const filteredJob = allAdminJobs?.filter((job)=> {
            if(!seachJobByText) {
                return true
            }
            return job?.tilte?.toLowerCase().includes(seachJobByText.toLowerCase()) 
        })
        setfilterJob(filteredJob)
    }
  },[seachJobByText, allAdminJobs])
  
  const handleClick = (jobId) => {
    console.log(jobId)
    navigate(`/admin/jobs/${jobId}`)
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { filterJob?.map((job) => (
              <tr key={job?._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={() => handleClick(job?._id)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>     
          )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
