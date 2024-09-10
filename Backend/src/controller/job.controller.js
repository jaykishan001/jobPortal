import { Job } from "../models/job.models.js";

const postJob = async(req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience,position, companyId}=req.body;
        const userId = req.user?._id;
        if([title,description,requirements,salary,location ,jobType,experience,position,companyId].some((field)=> field?.trim === "")){
            return res.status(400).json({
                message: "All field are required",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            experience,
            position,
            company: companyId,
            location,
            jobType,
            createad_by: userId

        })

        console.log("created job data", job)

        if(!job) {
            return res.status(400).json({
                message: "Job is not created",
                success: false,
            })
        }

        return res.status(201).json({
            message: "Job is successfully created",
            success: false,
        })



    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Something went wrong while creating job",
            success: false
        })
    }
}

const getAllJobs = async(req, res) => { 
    try {
        //filtering 
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex:keyword, $options: "i"}},
            ]
        };

        //populate is used to get company details
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});


        if(!jobs.length) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
           message: "Everything is fine",
           jobs,
           success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while finding jobs",
            success: true
         })
         
    }
}

//for applicant
const getJobById = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "company"
        }).populate({
            path: "applications"
        })

        if(!job) {
            return res.status(400).json({
                message: "there is no job with this id",
                success: false
             })            
        }

        return res.status(200).json({
            message: "Everything is fine",
            job,
            success: true
         })
         
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Everything went Wrong while find job",
            success: false
         })
         
    }
}

//Number of jobs created by logged in admin
const getAdminJobs = async(req, res) => {
    try {
        const adminId = req.user?._id;
        const jobs = await Job.find({createad_by: adminId}).populate({
            path: 'company',
            createadAt: -1
        });

        if(!jobs){
            return res.status(400).json({
                message: "Jobs are not found",
                success: false
             })    
        }
        return res.status(200).json({
            message: "Everything is fine",
            jobs,
            success: true
         })
         
    } catch (error) {
        
    }
}

export {postJob, getAllJobs, getJobById, getAdminJobs}