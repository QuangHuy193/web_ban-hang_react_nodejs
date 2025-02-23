
import { StatusCodes } from "http-status-codes";
import { menuService } from "~/services/memuService";

const createNew = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const createdMenu = await menuService.createNew(req.body)

    //co ket qua tra ve client
    res
      .status(StatusCodes.CREATED)
      .json(createdMenu);
  } catch (error) {
    next(error);
  }
};

const findAllMenuParent = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const findAllMenu = await menuService.findAllMenuParent()

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(findAllMenu);
  } catch (error) {
    next(error);
  }
};

const findAllMenuChildrent = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const findAllMenu = await menuService.findAllMenuChildrent()

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(findAllMenu);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const findAllMenu = await menuService.findAll()

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(findAllMenu);
  } catch (error) {
    next(error);
  }
};

const findMenuChild = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const findMenuChild = await menuService.findMenuChild(req.params.id)

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(findMenuChild);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const updated = await menuService.update(req.body)

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
    const deleted = await menuService.deleteOne(req.body.id)

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(deleted);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {   
    //dieu huong sang service
    const findMenu= await menuService.findOne(req.params.id)

    //co ket qua tra ve client
    res
      .status(StatusCodes.OK)
      .json(findMenu);
  } catch (error) {
    next(error);
  }
};

export const menuController = {
  createNew,
  findAll,
  update,
  deleteOne,
  findMenuChild,
  findAllMenuChildrent,
  findAllMenuParent,
  findOne
};
