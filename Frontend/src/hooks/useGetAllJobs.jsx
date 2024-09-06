import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice';

function useGetAllJobs() {
    const dispatch = useDispatch();
    useEffect(()=> {
        const fetchAllJobs = async() => {
            try {
                const response = await axios.get(`${JOB_API_ENDPOINT}/get`, {
                    withCredentials: true
                })
                console.log(response)
                if(response.data.success) {
                     dispatch(setAllJobs(response.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs();
    }, [])

  return (
    <div>useGetAllJobs</div>
  )
}

export default useGetAllJobs