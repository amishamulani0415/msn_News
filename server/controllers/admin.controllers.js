import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js"
// import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
// import { uploadonCloudinary } from "../utils/cloudinary.js"
import bcrypt from "bcryptjs";
const options = {
    httpOnly: true,
    secure: true
}

const generateTokens = (async (userId) => {
    try {
        const user = await Admin.findById(userId)
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

const RegisterAdmin = AsyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are neccesory")
    }

    const isUsedEmail = await Admin.findOne({
        $or: [{ email }]
    })

    if (isUsedEmail) {
        throw new ApiError(409, "This email already registered, Use different email")
    }

    const user = await Admin.create({
        email,
        password
    })

    const createdUser = await Admin.findById(user._id).select(
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
                    admin: createdUser, accessToken, refreshToken
                },
                "User created successfully"
            )
        )

})

const LoginAdmin = AsyncHandler(async (req, res) => {

    const { email, password } = req.body

    if ([email, password].some((field) => field?.trim === "")) {
        throw new ApiError(400, "Enter all details")
    }
    const user = await Admin.findOne({
        $or: [{ email }]
    })

    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    const passwordCheck = await user.isPasswordCorrect(password)

    if (!passwordCheck) {
        throw new ApiError(402, "Password is incorrect")
    }
    const LoggedinUser = await Admin.findById(user._id).select(
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
                    admin: LoggedinUser, refreshToken, accessToken
                },
                "User logged in successfully"
            )

        )
})


const GetCurrentAdmin = AsyncHandler(async (req, res) => {
    return res
        .status(202)
        .json(
            new ApiResponse(
                202,
                {
                    admin: req.user
                },
                "User details fetched successfully"
            )
        )
})

const RefreshAccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.ADMIN_REFRESH_TOKEN_SECRET
        )

        const user = await Admin.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const { accessToken, refreshToken } = await generateTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

export {
    RegisterAdmin,
    LoginAdmin,
    GetCurrentAdmin,
    RefreshAccessToken,
}