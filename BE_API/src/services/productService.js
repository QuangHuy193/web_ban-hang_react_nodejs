/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { productModel } from "~/models/productModel";

const createNew = async (resBody) => {
  try {
    const newProduct = {
      ...resBody,
    };

    //goi model
    const createNew = await productModel.createNew(newProduct);

    return await productModel.findOneByid(createNew.insertedId);
  } catch (error) {
    throw error;
  }
};

const update = async (resBody) => {
  try {
    const { id, ...newProduct } = resBody;

    //goi model
    const updated = await productModel.update(id, newProduct);

    return await productModel.findOneByid(id);
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  try {
    return await productModel.findAll();
  } catch (error) {
    throw error;
  }
};

const findOneById = async (id) => {
  try {
    return await productModel.findOneByid(id);
  } catch (error) {
    throw error;
  }
};

const deleteOne = async (id) => {
  try {
    return await productModel.deleteOne(id);
  } catch (error) {
    throw error;
  }
};
const getProductMenuId = async (menuId) => {
  try {
    return await productModel.getProductMenuId(menuId);
  } catch (error) {
    throw error;
  }
};

export const productService = {
  createNew,
  findAll,
  update,
  deleteOne,
  findOneById,
  getProductMenuId,
};
