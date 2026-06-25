import { Router } from "express";
import * as user_controllers from "../controllers/userController.js"
import verifyToken from "../middleware/authzcation_middleware.js";

const userRouter = Router();

userRouter.post("/register", user_controllers.register);

userRouter.post("/login", user_controllers.login);

userRouter.get("/logout", verifyToken, user_controllers.logout);

userRouter.get("/profile", verifyToken, user_controllers.getProfile)

userRouter.post("/forget-password",  user_controllers.forgetPassword)

userRouter.post("/reset-password/:token",  user_controllers.resetPassword)

export default userRouter;