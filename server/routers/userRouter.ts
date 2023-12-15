import { Router } from "express";
import { createUserController, isLoginPossibleController, isLoginPossibleMiddleware, loginUserController } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/create",createUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/isLoginpossible", isLoginPossibleMiddleware, isLoginPossibleController);

export default userRouter;