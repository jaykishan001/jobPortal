import { Badge } from "@/components/ui/badge"
import React from 'react'
import { useNavigate } from "react-router-dom";

function LatestJobCards({data}) {
  
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${data?._id}`)} className='p-5 rounded-md shadow-xl bg-white border boder-gray-100 cursor-pointer'>
      <div>
      <h1 className="font-medium text-lg">{data.company?.name}</h1>
      <p className="text-sm text-gray-600">{data?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{data?.title}</h1>
        <p className="text-sm text-gray-600">{data?.description}</p>
      </div>
      <div className='flex item-center gap-2 mt-4'>
        <Badge className='text-blue-700 font bold' variant="ghost">{data?.position}</Badge>
        <Badge className='text-red-500 font bold' variant="ghost">{data?.jobType}</Badge>
        <Badge className='text-purple-700 font bold' variant="ghost">{data?.salary}lpa</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards