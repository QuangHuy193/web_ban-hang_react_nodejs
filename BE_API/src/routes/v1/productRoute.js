import express from "express";
import { productValidation } from "~/validations/productValidation";
import { productController } from "~/controllers/productController";

const Router = express.Router();

Router.route("/add").post(
  productValidation.createNew,
  productController.createNew
);

Router.route("/list").get(productController.findAll);

Router.route("/update").post(productValidation.update, productController.update);

Router.route("/delete").post(productController.deleteOne);

Router.route("/find/:id").get(productController.findOneById);

Router.route("/findMenuId/:id").get(productController.getProductMenuId);

export const productRoute = Router;
