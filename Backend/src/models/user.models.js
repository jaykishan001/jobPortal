import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["applicant", "recruiter"],
        required: true,
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String}, //URL of Resume file
        resumeOrignalName: {type: String},
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        profilePhoto: {
            type: String,
            default: ""
        }

    },
    refreshToken: {
        type: String
    }


}, {timestamps: true})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10); 
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    //it will give us boolean value
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Fixed typo
    });
}

userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Fixed typo
    });
}

export const User = mongoose.model("User", userSchema)