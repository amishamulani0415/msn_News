import { Router } from "express"
import {
    RegisterAdmin,
    LoginAdmin,
    GetCurrentAdmin,
    RefreshAccessToken,
} from "../controllers/admin.controllers.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
// import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

// router.route("/register").post(RegisterAdmin)
//commented so that people don't register as admin we can push admin directly into our database
//this route for development purpose only

router.route("/login").post(LoginAdmin)
router.route("/get-admin-details").get(verifyJwt, GetCurrentAdmin)
router.route("/refresh-token").get(RefreshAccessToken)

export default router