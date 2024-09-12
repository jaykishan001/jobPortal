import {createSlice} from "@reduxjs/toolkit"

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        seachJobByText: "",
        appliedJobs: [],
        searchedQuery: "",
    },
    reducers: {
        //actions

        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.seachJobByText = action.payload
        },
        setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        }

    }

})

export const {setAllJobs, setSingleJob, setAdminJobs, setSearchJobByText, setAppliedJobs, setSearchedQuery} = jobSlice.actions
export default jobSlice.reducer