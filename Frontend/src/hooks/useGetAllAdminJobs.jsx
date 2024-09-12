import React, { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '../utils/constant'
import { setAdminJobs } from '../redux/jobSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'

function useGetAllAdminJobs() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, {withCredentials: true})
                console.log(res)
                console.log("Response of admin jobs hook", res.data.jobs)
                if(res.data.success) {
                    dispatch(setAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAdminJobs();
      }, [])
}

export default useGetAllAdminJobs