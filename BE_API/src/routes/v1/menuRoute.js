import express from "express";
import { menuValidation } from "~/validations/menuValidation";
import { menuController } from "~/controllers/menuController";

const Router = express.Router();

Router.route("/add").post(menuValidation.createNew, menuController.createNew);

Router.route("/list").get(menuController.findAllMenuParent);

Router.route("/listall").get(menuController.findAll);

Router.route("/listallchild").get(menuController.findAllMenuChildrent);

Router.route("/update").post(menuValidation.update, menuController.update);

Router.route("/delete").post(menuController.deleteOne);

Router.route("/find/:id").get(menuController.findMenuChild);

Router.route("/findOne/:id").get(menuController.findOne);

export const menuRoute = Router;
