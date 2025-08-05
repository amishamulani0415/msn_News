import { Admin } from "../models/admin.model.js"
import { ApiError } from "../utils/ApiError.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import jwt from "jsonwebtoken"

export const verifyJwt = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(400, "invalid request of unlown user")
        }

        const decodedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET)
        const user = await Admin.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(400, "Invalid user token")
        }

        req.user = user
        next()

    } catch (error) {
        throw new ApiError(500, "error verifying user")
    }
})