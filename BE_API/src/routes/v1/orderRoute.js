import express from "express";
import { orderController } from "~/controllers/orderController";
import { orderDetailValidation } from "~/validations/orderDetailValidation";
import { orderValidation } from "~/validations/orderValidation";

const Router = express.Router();

Router.route("/add").post(
  orderValidation.createNew,
  orderController.createNew
);

Router.route("/getOrder").get(
  orderController.findMoreById
);

Router.route("/list").get(
  orderController.findAll
);

export const orderRoute = Router;
