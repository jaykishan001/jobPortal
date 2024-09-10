import axios from 'axios'

import React, { useEffect } from 'react'
import { COMPANY_API_ENDPOINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice';

function useGetCompanyById(companyId) {
   const dispatch = useDispatch();

    
  useEffect(() => {
    const fetchSingleJobs = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {withCredentials: true})
            if(res.data.success) {
                dispatch(setSingleCompany(res.data.company))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchSingleJobs();
  }, [companyId])
}

export default useGetCompanyById;