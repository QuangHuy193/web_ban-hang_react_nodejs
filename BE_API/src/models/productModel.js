import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validator";

//dinh nghia colection (name & Schema)
const PRODUCT_COLECTION_NAME = "products";
const PRODUCT_COLECTION_SCHEMA = Joi.object({
  thumbail: Joi.string().required(), // Đường dẫn URL của ảnh
  name: Joi.string().min(3).max(50).required().trim(), // Tên sản phẩm
  size: Joi.string().valid(
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43"
  ), // Kích cỡ sản phẩm
  price: Joi.number().greater(0).required(), // Giá sản phẩm (lớn hơn 0)
  qty: Joi.number().integer().min(0).required(), // Số lượng sản phẩm (>= 0)
  menu_id: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE), // Tham chiếu đến _id của `menus`
});

const validateBeforeCreate = async (data) => {
  return await PRODUCT_COLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    return await GET_DB()
      .collection(PRODUCT_COLECTION_NAME)
      .insertOne(validData);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneByid = async (id) => {
  try {
    const result = await GET_DB()
      .collection(PRODUCT_COLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findAll = async () => {
  try {
    return await GET_DB().collection(PRODUCT_COLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  return await GET_DB()
    .collection(PRODUCT_COLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(id) }, // Điều kiện tìm tài nguyên cần cập nhật
      { $set: data } // Dữ liệu cần cập nhật
    );
};

const deleteOne = async (id) => {
  try {
    const result = await GET_DB()
      .collection(PRODUCT_COLECTION_NAME)
      .deleteOne({
        _id: new ObjectId(id),
      });

    return result.deletedCount;
  } catch (error) {
    throw new Error(error);
  }
};

const getProductMenuId = async (menuId) => {
  try {
    const result = await GET_DB()
      .collection(PRODUCT_COLECTION_NAME)
      .find({
        menu_id: menuId,
      })
      .toArray();

    const uniqueProducts = [];
    const productNames = new Set();

    for (const product of result) {
      if (!productNames.has(product.name)) {
        productNames.add(product.name);
        uniqueProducts.push(product);
      }
    }
    
    return uniqueProducts;
  } catch (error) {
    throw new Error(error);
  }
};

export const productModel = {
  PRODUCT_COLECTION_NAME,
  PRODUCT_COLECTION_SCHEMA,
  createNew,
  findOneByid,
  findAll,
  deleteOne,
  update,
  getProductMenuId,
};
