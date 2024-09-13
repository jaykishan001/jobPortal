import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './ApiError.js';
import fs from "fs"
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadCloudinary = async(localFilePath) =>  {
    try {
        if(!localFilePath) throw new ApiError(409, "file Path does not exist");
        const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: 'auto'
       })
        // console.log(response.url)
        try {
            fs.unlinkSync(localFilePath)
        } catch (error) {
            console.log("there is some problem while deleting file")
        }
       return response;
    } catch (error) {
        console.log("There is some problem while uploading file on cloudinary", error)
        try {
            fs.unlinkSync(localFilePath)
        } catch (error) {
            console.log("there is some problem while deleting file")
        }
        return null;
    }}

    export {uploadCloudinary}