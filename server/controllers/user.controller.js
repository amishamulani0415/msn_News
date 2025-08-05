import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
// import { uploadonCloudinary } from "../utils/cloudinary.js"
import bcrypt from "bcryptjs";
const options = {
    httpOnly: true,
    secure: true
}

const generateTokens = (async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(500, "User not found while generating tokens")
        }

        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        if (!(accessToken || refreshToken)) {
            throw new ApiError(500, "Error while generating tokens")
        }

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { refreshToken, accessToken }
    } catch (error) {
        throw new ApiError(500, "all went wrong in generating tokens")
    }

})

const RegisterUser = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are neccesory")
    }

    const isUsedEmail = await User.findOne({
        $or: [{ email }]
    })

    if (isUsedEmail) {
        throw new ApiError(409, "This email already registered, Use different email")
    }

    const isUsedUsername = await User.findOne({
        $or: [{ username }]
    })

    if (isUsedUsername) {
        throw new ApiError(409, "Username already Exists")
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Error while creating User")
    }

    const { refreshToken, accessToken } = await generateTokens(createdUser._id)


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: createdUser, accessToken, refreshToken
                },
                "User created successfully"
            )
        )

})

const LoginUser = AsyncHandler(async (req, res) => {

    const { userInfo, password } = req.body

    if ([userInfo, password].some((field) => field?.trim === "")) {
        throw new ApiError(400, "Enter all details")
    }
    const username = userInfo
    const email = userInfo
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    const passwordCheck = await user.isPasswordCorrect(password)

    if (!passwordCheck) {
        throw new ApiError(402, "Password is incorrect")
    }
    const LoggedinUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    const { refreshToken, accessToken } = await generateTokens(user._id)

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                {
                    user: LoggedinUser, refreshToken, accessToken
                },
                "User logged in successfully"
            )

        )
})


const GetCurrentUser = AsyncHandler(async (req, res) => {
    return res
        .status(202)
        .json(
            new ApiResponse(
                202,
                {
                    user: req.user
                },
                "User details fetched successfully"
            )
        )
})

const LogoutUser = AsyncHandler(async (req, res) => {
    await User.findOneAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    return res
        .status(200)
        .cookie("accessToken", options)
        .cookie("refreshToken", options)
        .json(
            new ApiResponse(200, { user: null }, "Logout was successful")
        )
})

const DeleteProfile = AsyncHandler(async (req, res) => {
    const deleteAccount = await User.findOneAndDelete({ _id: req.user?._id })

    if (!deleteAccount) {
        throw new ApiError(400, "Error deleting account")
    }

    return res
        .status(200)
        .cookie("accessToken", options)
        .cookie("refreshToken", options)
        .json(
            new ApiResponse(200, { user: null }, "User delete succesfully")
        )

})

const RefreshAccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const {accessToken, refreshToken} = await generateTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: refreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})


export {
    RegisterUser,
    LoginUser,
    GetCurrentUser,
    LogoutUser,
    DeleteProfile,
    RefreshAccessToken
}