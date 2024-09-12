import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Badge } from "@/components/ui/badge" 
import { useSelector } from 'react-redux'

function AppliedJobTable() {
    
   const {appliedJobs} = useSelector(state => state.job)

  return (
    <div>
        <Table>
            <TableCaption>
                A list of your applied jobs
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appliedJobs.length <= 0 ? <span>You haven;t applied any job yet</span> : appliedJobs?.map((item) => (
                    <TableRow key={item?._id}>
                        <TableCell>{item?.job?.createdAt?.split("T")[0]}</TableCell>
                        <TableCell>{item?.job?.title}</TableCell>
                        <TableCell>{item?.job?.company?.name}</TableCell>
                        <TableCell className="text-right"><Badge className= {`${item?.status === "rejected" ? 'bg-red-400' : item.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`} >{item?.status}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable