import { orderModel } from "~/models/orderModel";

const createNew = async (resBody) => {
  try {
    // Gọi model để thêm order vào database
    const createdOrder = await orderModel.createNew(resBody);    

    // Trả về thông tin order vừa tạo
    return createdOrder.insertedId
  } catch (error) {
    throw error;
  }
};

const findMoreById = async (id) => {
  try {
    return await orderModel.findMoreById(id);
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
    try {
      return await orderModel.findAll();
    } catch (error) {
      throw error;
    }
  };

export const orderService = {
  createNew,
  findMoreById,
  findAll
};
