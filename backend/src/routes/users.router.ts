import { Router } from "express";
import { UsersController } from "../controllers";
import { authJWT } from "../middlewares/validateJWT";

const usersController = new UsersController();

export const usersRouter = Router()
  .post("/signup", usersController.signup)
  .post("/login", usersController.login)
  .get("/test", authJWT, usersController.protected);
