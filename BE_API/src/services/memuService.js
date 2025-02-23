/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { menuModel } from "~/models/menuModel";

const createNew = async (resBody) => {
  try {
    const newMenu = {
      ...resBody,
    };

    //goi model
    const createNew = await menuModel.createNew(newMenu)

    return await menuModel.findOneByid(createNew.insertedId);
  } catch (error) {
    throw error;
  }
};

const update = async (resBody) => {
  try {
    const { id, ...newMenu } = resBody;

    //goi model
    const updated = await menuModel.update(id, newMenu)

    return await menuModel.findOneByid(id);
  } catch (error) {
    throw error;
  }
};

const findAllMenuParent = async () => {
  try {
    return await menuModel.findAllMenuParent()
  } catch (error) {
    throw error;
  }
};

const findAllMenuChildrent = async () => {
  try {
    return await menuModel.findAllMenuChildrent()
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  try {
    return await menuModel.findAll()
  } catch (error) {
    throw error;
  }
};

const findMenuChild = async (id) => {
  try {
    const parentId = id.toString()
    return await menuModel.findMenuChild(parentId)
  } catch (error) {
    throw error;
  }
};

const deleteOne = async (id) => {
  try {
    return await menuModel.deleteOne(id)
  } catch (error) {
    throw error;
  }
};

const  findOne= async (id) => {
  try {
    return await menuModel.findOneByid(id)
  } catch (error) {
    throw error;
  }
};

export const menuService = {
  createNew,
  findAll,
  update,
  deleteOne,
  findMenuChild,
  findAllMenuParent,
  findAllMenuChildrent,
  findOne
};
