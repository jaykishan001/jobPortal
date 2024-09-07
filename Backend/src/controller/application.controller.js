import { Appication } from "../models/application.models.js";
import {Job} from "../models/job.models.js"



const applyJob = async(req, res) => {
    try {
        const jobId = req.params.id;
        const userId =  req.user?._id;
        

        if(!jobId) {
            return res.status(400).json({
                message: "Job is required",
                success: false
            })
        }
        
        //check if job exist or not 
        const job =  await Job.findById(jobId)
        
        if(!job){
            return res.status(400).json({
                message: "Job doesn't exist",
                success: false
            })
        }
        //check if applicant has already applied for this job or not
        const existingApplicant =  await Appication.findOne({job: jobId , applicant: userId})
        
        if(existingApplicant) {
            return res.status(401).json({
                message: "Applicant already registered for this job",
                success: false,
            })
        }


        const newApplication = await Appication.create({
            applicant: userId,
            job: jobId
        })

        console.log("new application status:", newApplication)
        await job.applications.push(newApplication._id);
        await job.save({validateBeforeSave: false});

        return res.status(200).json({
            message: "Job applied Successfully.",
            success: true        
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Somthing went wrong while applying job",
            success: false
        })
    }
}
const getAppliedJob = async(req, res) => {
    try {
        const userId =  req.user?._id
       
        const applications = await Appication.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: 'job',
            options: {sort: {createdAt: -1}},
            populate: {
                path: 'company',
                options: {sort: {createdAt: -1}}
            }
        })
        if(!applications) {
            return res.status(400).json({
                message: "No Application",
                success:false
            })
        }
        return res.status(200).json({
            applications,
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "No Application",
            success:false
        })
    }
}
//for admin how many applicant applied
const getApplicant = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            option: {
                sort: {createdAt: -1},
                populate: {
                    path: 'applicant'
                }
            }
        })
        console.log(job)
        if(!job) {
            return res.status(404).json({
                message: 'Job Not found',
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        return res.status(400).json({
            message: "Applicant not found",
            success: false,
        })
    }
}
const updateStatus = async(req, res) => {
    try {
        const {status} = req.body
        const applicationId = req.params.id

        if(!status) {
            return res.status(400).json({
                message:"status is required",
                success: false
            })
        };
        //find the applicantion by application id
        const application = await Appication.findOne({_id: applicationId})
        if(!application) {
            return res.status(400).json({
                message: "Application not found",
                success: false,
            })
        }
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: false
        })

    } catch (error) {
        return res.status(400).json({
            message: "Somthing went wrong while updating status",
            success: false
        })
    }
}
export {applyJob, getApplicant, getAppliedJob, updateStatus}