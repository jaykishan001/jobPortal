import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadCloudinary } from "../utils/Cloudinary.js";

const generateAccessTokenRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    // console.log("User data", user);

    if (!user) {
      throw new ApiError(404, "User doesn't exist");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    if (!accessToken) {
      throw new ApiError(400, "Failed to generate access token");
    }

    if (!refreshToken) {
      throw new ApiError(400, "Failed to generate refresh token");
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generateAccessTokenRefreshToken:", error.message);
    throw new ApiError(400, "Something went wrong while generating token");
  }
};

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    // console.log(fullName, email, password, phoneNumber, role);
    
    //check all field are present
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "All field are required",
        success: false,
      });
    }

    //check does user already exist
    const existedUser = await User.findOne({
      $or: [{ email: email }, { phoneNumber: String(phoneNumber) }],
    });

    if (existedUser) {
      return res.status(400).json({
        message: "user already exist with this email or Phonenumber",
        success: false,
      });
    }

    const profilePhotoLocalPath = req.file?.path

    if (!profilePhotoLocalPath) {
      return res.status(400).json({
        message: "Profile photo not provided",
        success: false
      });
    }

    // console.log(profilePhotoLocalPath);

    const profilePhotoUrl =  await uploadCloudinary(profilePhotoLocalPath)
    // console.log("profile photo cloudinary local path", profilePhotoUrl)
    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
      role,
      "profile.profilePhoto": profilePhotoUrl.url
    });

    const createdUser = await User.findById(user._id).select(
      " -password -refreshToken"
    );

    if (!createdUser) {
      return new ApiError(404, "Something went wrong while registering user");
    }

    return res.status(201).json({
      message: "User has registered Successfully",
      success: true,
    });
  } catch (error) {
    console.log("User is not created due to some error", error);
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({
      message: "All field are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return new ApiError(404, "User doesn't have an account");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(String(password));
  if (!isPasswordCorrect) {
    return new ApiError(404, "Password is incorrect");
  }

  if (role !== user.role) {
    return res.status(400).json({
      message: "with this role user is not defined",
      success: false,
    });
  }

  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    " -password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json({
      message: `Welcome ${loggedInUser.fullName}`,
      user: loggedInUser,
      accessToken,
      refreshToken,
      success: true,
    });
};

const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(
      userId,
      {
        refreshToken: undefined,
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        message: "User logged Out successfully",
        success: true,
      });
  } catch (error) {
    throw new ApiError(400, "Something went wrong while logout");
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName , phoneNumber, bio, skills } = req.body;
    // console.log(req.file)
    const resumeLocalpath = req.file?.path;
    
    if(!resumeLocalpath) {
      throw new ApiError(400, "file not found")
    }

    let user = await User.findById(userId);
    
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const uploadedresume = await uploadCloudinary(resumeLocalpath)
    // console.log("Resume cloudinary link", uploadedresume.url)

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills;
    if(resumeLocalpath) user.profile.resume = uploadedresume.url

    // Save the updated user
    await user.save();

    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      // email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "User is not authenticated",
    });
  }
};

export { registerUser, loginUser, logoutUser, updateUserProfile };
