import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

//dinh nghia colection (name & Schema)
const ORDER_COLECTION_NAME = "orders";
const ORDER_COLECTION_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(5).max(100).required(),
  city: Joi.number().integer().required(),
  district: Joi.string().min(3).max(50).required(),
  ward: Joi.string().min(3).max(50).required(),
  address: Joi.string().min(5).max(150).required(),
  products: Joi.array().required(),
  phone: Joi.string().min(10).required(),
  total: Joi.number().integer().min(0).required(),
  create_at: Joi.date().timestamp("javascript").default(Date.now), // Thời gian tạo đơn hàng
  status: Joi.string()
    .valid("pending", "completed", "canceled")
    .default("pending"),
});

const validateBeforeCreate = async (data) => {
  return await ORDER_COLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneByid = async (id) => {
  try {
    const result = await GET_DB()
      .collection(ORDER_COLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    return await GET_DB().collection(ORDER_COLECTION_NAME).insertOne(validData);
  } catch (error) {
    throw new Error(error);
  }
};

const findMoreById = async (id) => {
  const orders = await GET_DB()
    .collection(ORDER_COLECTION_NAME)
    .find({ user_id: id })
    .toArray(); // Chuyển đổi cursor thành mảng kết quả

  const ordersWithDetails = await Promise.all(
    orders.map(async (order) => {
      const orderDetails = await orderDetailModel.findMoreById(order._id); // Gọi hàm findMoreById của orderDetailModel
      return {
        ...order,
        orderDetails,
      };
    })
  );

  return ordersWithDetails;
};

const findAll = async () => {
  const orders = await GET_DB()
    .collection(ORDER_COLECTION_NAME)
    .find({})
    .toArray();

  return orders;
};

export const orderModel = {
  ORDER_COLECTION_NAME,
  ORDER_COLECTION_SCHEMA,
  findOneByid,
  createNew,
  findMoreById,
  findAll,
};
