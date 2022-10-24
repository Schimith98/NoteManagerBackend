import express, { Request, Response } from "express";
import { Schema } from "mongoose";

import { user as userController } from "../../controllers/user";
import { checkUserBody } from "../../validations/user";

const userRouter = express.Router();

userRouter.post(
  "/auth/register",
  checkUserBody,
  async (request: Request, response: Response) => {
    await userController.createUser(request, response);
  }
);

userRouter.post("/auth/login", async (request: Request, response: Response) => {
  await userController.login(request, response);
});

export default userRouter;
