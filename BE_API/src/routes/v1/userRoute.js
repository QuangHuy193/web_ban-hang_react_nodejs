import express from "express";
import { userController } from "~/controllers/userController";
import { userValidation } from "~/validations/userValidation";

const Router = express.Router();

Router.route("/signup").post(userValidation.createNew ,userController.createNew);

Router.route("/signin").post(userValidation.signIn ,userController.getUserWithSignIn);

Router.route("/update").post(userValidation.update ,userController.update);

Router.route("/list").get(userController.findAll);

Router.route("/getOne/:id").get(userController.findUserById);

export const userRoute = Router;