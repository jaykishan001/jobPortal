import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice';

function useGetAllJobs() {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store => store.job);
    useEffect(()=> {
        const fetchAllJobs = async() => {
            try {
                const response = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true
                })
                console.log("response of jobs", response)
                if(response.data.success) {
                     dispatch(setAllJobs(response.data.jobs))
                }
            } catch (error) {
                console.log("Get All jobs",error)
            }
        }
        fetchAllJobs();
    }, [])
}

export default useGetAllJobs