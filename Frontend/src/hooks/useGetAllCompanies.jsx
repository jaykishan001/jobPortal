import  { useEffect } from 'react'
import { setAllCompanies } from '../redux/companySlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { COMPANY_API_ENDPOINT } from '../utils/constant';

function useGetAllCompanies() {
    const dispatch = useDispatch();

    
    useEffect(() => {
      const fetchCompanies = async () => {
          try {
              const res = await axios.get(`${COMPANY_API_ENDPOINT}/getCompany`, {withCredentials: true})
              if(res.data.success) {
                  dispatch(setAllCompanies(res.data.companies))
              }
          } catch (error) {
              console.log(error)
          }
      }
      fetchCompanies();
    }, [])
}

export default useGetAllCompanies