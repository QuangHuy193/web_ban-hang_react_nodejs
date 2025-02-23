import { StatusCodes } from "http-status-codes";
import { userService } from "~/services/userService";

const createNew = async (req, res, next) => {
  try {
    //dieu huong sang service
    const createdUser = await userService.createNew(req.body);

    //co ket qua tra ve client
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error) {
    next(error);
  }
};

const getUserWithSignIn = async (req, res, next) => {
  try {
    //dieu huong sang service
    const userSignIn = await userService.getUserWithSignIn(req.body);

    //co ket qua tra ve client
    res.status(StatusCodes.OK).json(userSignIn);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    //dieu huong sang service
    const Updated = await userService.update(req.body);

    //co ket qua tra ve client
    res.status(StatusCodes.OK).json(Updated);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    //dieu huong sang service
    const result = await userService.findAll();

    //co ket qua tra ve client
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const findUserById = async (req, res, next) => {
  try {    
    //dieu huong sang service
    const result = await userService.findUserById(req.params.id);

    //co ket qua tra ve client
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createNew,
  getUserWithSignIn,
  update,
  findAll,
  findUserById
};
