/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from "express";
import { StatusCodes } from "http-status-codes";
import { menuRoute } from "~/routes/v1/menuRoute";
import { productRoute } from "~/routes/v1/productRoute";
import { userRoute } from "./userRoute";
import { orderRoute } from "./orderRoute";




const Router = express.Router();

//check APIs v1
Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "API V1 are ready to use" });
});

//Menus APIs
Router.use("/menus", menuRoute);

Router.use("/products", productRoute);

Router.use("/users", userRoute);

Router.use("/orders", orderRoute);





export const APIs_V1 = Router;
