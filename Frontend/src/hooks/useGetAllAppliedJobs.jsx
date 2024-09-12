import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAppliedJobs } from '../redux/jobSlice'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../utils/constant'

function useGetAllAppliedJobs() {
    const dispatch = useDispatch()
    useEffect(() => {
       try {
         const fetchAppliedJob = async() => {
             const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
                 withCredentials: true
             })
             console.log(res)
             if(res.data.success) {
                 dispatch(setAppliedJobs(res.data.applications))
             }
         }
         fetchAppliedJob()
       } catch (error) {
        console.log(error)
       }
    }, [])
}

export default useGetAllAppliedJobs