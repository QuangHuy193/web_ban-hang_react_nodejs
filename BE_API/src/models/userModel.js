import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
const bcrypt = require("bcrypt");

//dinh nghia colection (name & Schema)
const USER_COLECTION_NAME = "users";
const USER_COLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().strict(),
  email: Joi.string().email().required().trim().strict(), // Email hợp lệ
  pass: Joi.string().min(8).max(128).required(), // Mật khẩu (cần mã hóa trước khi lưu)
  address: Joi.string().max(255).trim().strict(), // Địa chỉ người dùng
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .trim(), // Số điện thoại (10-15 chữ số)
  admin: Joi.boolean().default(false), // Phân quyền admin (mặc định false)
});

const validateBeforeCreate = async (data) => {
  return await USER_COLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneByid = async (id) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLECTION_NAME)
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

    return await GET_DB().collection(USER_COLECTION_NAME).insertOne(validData);
  } catch (error) {
    throw new Error(error);
  }
};

const getUserWithSignIn = async (data) => {
  try {
    const result = await GET_DB().collection(USER_COLECTION_NAME).findOne({
      email: data.email,
    });

    if (!result) {
      throw new Error("Email không chính xác");
    }

    const isValidPassword = await bcrypt.compare(data.pass, result.pass);

    if (!isValidPassword) {
      throw new Error("Mật khẩu không chính xác");
    }
    const { pass, ...userWithoutPass } = result;

    return userWithoutPass;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  return await GET_DB()
    .collection(USER_COLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(id) }, // Điều kiện tìm tài nguyên cần cập nhật
      { $set: data } // Dữ liệu cần cập nhật
    );
};

const findAll = async () => {
  try {
    return await GET_DB().collection(USER_COLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = {
  USER_COLECTION_NAME,
  USER_COLECTION_SCHEMA,
  createNew,
  findOneByid,
  getUserWithSignIn,
  update,
  findAll
};
