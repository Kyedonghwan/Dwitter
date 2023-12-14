import { Router } from "express";
import { createUserController } from "../controllers/userController";
import userRouter from "./userRouter";

const rootRouter = Router();

rootRouter.use("/users", userRouter);

export default rootRouter;