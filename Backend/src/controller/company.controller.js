import {Company} from "../models/company.models.js"
import { ApiError } from "../utils/ApiError.js"


const registerCompany = async(req, res)=> {
    try {
        const {name} = req.body;
        if(!name) {
            return res.status(400).json({
                message:"fields are required",
                success: false
            })
        }

        const company =  await Company.findOne({name});
        if(company) {
            
        return res.status(400).json({
        message: "This company name already exists.",
        success: false
});
        }

        await Company.create({
            name: name,
            userId: req.user._id
        })

        return res.status(200)
        .json({
            message: "Company registered successfully",
            success: true
        })
       
    } catch (error) {
        throw new ApiError((400, "Something went wrong while registering company"))
        
    }
}


const getCompany = async(req, res) => {
    try {
       const userId =  req.user?._id;
       const companies = await Company.find({userId});
       
       if (companies.length === 0) {
        return res.status(404).json({
            message: "User doesn't have any registered companies.",
            success: false
        });
    }
        return res.status(200).json({
        companies,
        success: true
    });
    
    } catch (error) {
        console.log(error);
    }
}

const getComapanyById  = async (req, res) => {
     try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })
     } catch (error) {
        console.log(error);
     }
}

const updateCompanyInfo = async(req, res) => {
    try {
        const {name, description, location, website} = req.body;
        
        // const file = req.file;

        const companyId = req.params.id;
        let company = await Company.findById(companyId);
        if(!company) {
            return res.status(400)
            .json({
                message: "Company not found",
                success: false
            })
        }

        if(name) company.name = name;
        if(description) company.description= description
        if(location) company.location = location
        if(website) company.website = website

        
        await company.save({validateBeforeSave: false})
        
        // const updatedCompany = {
        //     name, description, location, website
        // }
        // console.log("Updated company details", updatedCompany)
        return res.status(200)
        .json({
            message: "Company info updated Successfully",
            company
        })
    } catch (error) {
        console.log(error)
        throw new ApiError(402, "Something went wrong while updating company info")
    }
}


export {registerCompany, getComapanyById, getCompany, updateCompanyInfo};