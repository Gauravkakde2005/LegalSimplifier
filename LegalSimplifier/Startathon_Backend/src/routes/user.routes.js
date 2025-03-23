import {Router} from "express"
import { loginUser, registerUser , logoutUser, getUsers, refreshAccessToken, changeCurrentPassword, getCurrentUser  } from "../controllers/user.controller.js"
import {verifyJWT} from '../middlewares/auth.middleware.js'

 
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route('/logout').post(verifyJWT, logoutUser)
router.route("/getUsers").get(getUsers);
router.route("/getCurrent-user").get(verifyJWT, getCurrentUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)



export default router