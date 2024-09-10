import {Company} from "../models/company.models.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadCloudinary } from "../utils/Cloudinary.js";


const registerCompany = async(req, res)=> {
    try {
        const { companyName } = req.body;
        console.log("name of the company", companyName)
        if(!companyName) {
            return res.status(400).json({
                message:"fields are required",
                success: false
            })
        }
        //checking does company already exist
        const checkCompany =  await Company.findOne({name: companyName});
        if(checkCompany) {
            
        return res.status(400).json({
        message: "This company name already exists.",
        success: false
});
        }

        const company =  await Company.create({
            name: companyName,
            userId: req.user._id
        })

        return res.status(200)
        .json({
            message: "Company registered successfully",
            company,
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
       console.log(companies)
       
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
    
    console.log("Comapny Id", req.params.id)
    try {
        const {name, description, location, website} = req.body;
        
        const logoLocalPath = req.file?.path;
        console.log("logo company controller local path", logoLocalPath)
        if(!logoLocalPath) {
            return res.status(401).json({
                message: "logo local path not exist"
            })
        }

        const companyId = req.params.id;
        if (!companyId) {
            return res.status(400).json({
                message: "Company ID is required",
                success: false
            });
        }
        let company = await Company.findById(companyId);
        console.log("company data", company)

        if(!company) {
            return res.status(400)
            .json({
                message: "Company not found",
                success: false
            })
        }

        const logo = await uploadCloudinary(logoLocalPath)

        if(name) company.name = name;
        if(description) company.description = description
        if(location) company.location = location
        if(website) company.website = website
        if(logo) company.logo = logo.url

        await company.save({validateBeforeSave: false})
        
        return res.status(200)
        .json({
            message: "Company info updated Successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
        throw new ApiError(402, "Something went wrong while updating company info")
    }
}

export {registerCompany, getComapanyById, getCompany, updateCompanyInfo};