import { StatusCodes } from "http-status-codes";
import { orderService } from "~/services/orderService";

const createNew = async (req, res, next) => {
  try {
    //dieu huong sang service
    const createdMenu = await orderService.createNew(req.body);

    //co ket qua tra ve client
    res.status(StatusCodes.CREATED).json(createdMenu);
  } catch (error) {
    next(error);
  }
};

const findMoreById = async (req, res, next) => {
  try {
    //dieu huong sang service
    const list = await orderService.findMoreById(req.body.id);

    //co ket qua tra ve client
    res.status(StatusCodes.OK).json(list);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
    try {
      //dieu huong sang service
      const list = await orderService.findAll();
  
      //co ket qua tra ve client
      res.status(StatusCodes.OK).json(list);
    } catch (error) {
      next(error);
    }
  };

export const orderController = {
  createNew,
  findMoreById,
  findAll
};
