/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";
import { productService } from "~/services/productService";

const createNew = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const createdMenu = await productService.createNew(req.body)

    //co ket qua tra ve client
    res
      .status(StatusCodes.CREATED)
      .json(createdMenu);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const findAllMenu = await productService.findAll()

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(findAllMenu);
  } catch (error) {
    next(error);
  }
};

const findOneById = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const findAllMenu = await productService.findOneById(req.params.id)

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(findAllMenu);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const updated = await productService.update(req.body)

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const deleted = await productService.deleteOne(req.body.id)

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(deleted);
  } catch (error) {
    next(error);
  }
};

const getProductMenuId = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const findAllMenu = await productService.getProductMenuId(req.params.id)

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(findAllMenu);
  } catch (error) {
    next(error);
  }
};

export const productController = {
  createNew,
  findAll,
  update,
  deleteOne,findOneById,getProductMenuId
};
