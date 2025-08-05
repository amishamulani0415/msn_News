import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String
        }
    }, {
    timestamps: true
}
)

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    console.log(this.password)
    next()
})

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)

}

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ADMIN_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY
        }
    )
}

adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ADMIN_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXPIRY
        }
    )
}


export const Admin = mongoose.model("Admin", adminSchema);