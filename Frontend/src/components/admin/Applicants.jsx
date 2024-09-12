import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(state => state.application)
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [params.id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
