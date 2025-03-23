import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend.
  // validation
  // check if user already exists
  // check for images and avatar
  // upload on cloudinary , avatar
  // create user objects - create entry in DB
  // remove password and refreshtoken from responce
  // check for user creation
  // return res

  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
     throw new ApiError(400, "All Fields are required..!");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser)
     throw new ApiError(409,"User already exists..!");

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    throw new ApiError(500 , "Something went wrong while creating User..!")
  }

  return res
    .status(201)
    .json(new ApiResponse(200, userCreated, "User Registered Successfully...!"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> body
  // username or email
  // find the user
  // password check
  // refresh token and access token
  // send cookies

  const { email, password } = req.body;

  if (!password || !email) {
    throw new ApiError(400, "Please provide email and password")
  }

  const existedUser = await User.findOne({ email });

  if (!existedUser) {
      throw new ApiError(404, "User does not exists")
  }

  const isPasswordCorrect = await existedUser.isPasswordCorrect(password);
  
  if (!isPasswordCorrect) {
     throw new ApiError(401, "Invalid User Credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser._id
  );

  const logedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logedInUser,
          refreshToken,
          accessToken,
        },
        "User logedin successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req?.user?._id,
      {
        $unset: {
          refreshToken: 1
        }
      }, { new: true })
  
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    }
  
    return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .send(new ApiResponse(200 , 'success' , {} , "User LoggedOut Successfully...!"))
})
  
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req?.cookies?.refreshToken || req.body.refreshToken
  
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    // console.log(`incomingRefreshToken : ${incomingRefreshToken}`)
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        // console.log(`decodedToken : ${decodedToken}`)
  
        const user = await User.findById(decodedToken?._id)
  
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
  
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }
  
        const options = {
            httpOnly: true,
            secure: true
        }
  
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        // console.log(`accesstoken  = ${accessToken} and refreshtoken : ${newRefreshToken}`)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .send(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token")
    }
  
  })

  const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
  
    const user = await User.findById(req?.user?._id)
  
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword, user.password);
  
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password !")
    }
  
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
  
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "password change successfully !"))
  })
  
  
  const getCurrentUser = asyncHandler(async (req, res) => {
  
    const user = req?.user
    if (!user) {
        throw new ApiError(401, "user not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, user, "user fetched successfully !"))
  })
  

const getUsers = asyncHandler(async  (req, res, next) => {

    const data = await User.find();
  
    res.json(new ApiResponse(200, data , "All data fetch succeefully"))
  });
  


export { 
    loginUser, 
    registerUser, 
    logoutUser, 
    getUsers, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser  
};