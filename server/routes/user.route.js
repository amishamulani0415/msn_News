import {Router } from "express"
import {
    RegisterUser,
    LoginUser,
    GetCurrentUser,
    LogoutUser,
    DeleteProfile,
    RefreshAccessToken
} from "../controllers/user.controller.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"
// import {upload} from "../middlewares/multer.middleware.js"


const router =Router()

router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.route("/details").get(verifyJwt,GetCurrentUser)
router.route("/logout").post(verifyJwt,LogoutUser)
router.route("/delete-account").delete(verifyJwt,DeleteProfile)
router.route("request-accessToken").post(RefreshAccessToken)

export default router