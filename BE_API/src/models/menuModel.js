import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

//dinh nghia colection (name & Schema)
const MENU_COLECTION_NAME = "menus";
const MENU_COLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().strict(),
  parentId: Joi.string().allow(""),
});

const validateBeforeCreate = async (data) => {
  return await MENU_COLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    return await GET_DB().collection(MENU_COLECTION_NAME).insertOne(validData);
  } catch (error) {
    throw new Error(error);
  }
};

const findAllMenuParent = async () => {
  try {
    return await GET_DB()
      .collection(MENU_COLECTION_NAME)
      .find({ parentId: "" })
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const findAll = async () => {
  try {
    return await GET_DB().collection(MENU_COLECTION_NAME).find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const findAllMenuChildrent = async () => {
  try {
    return await GET_DB()
      .collection(MENU_COLECTION_NAME)
      .find({ parentId: { $ne: "" } })
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  return await GET_DB()
    .collection(MENU_COLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(id) }, // Điều kiện tìm tài nguyên cần cập nhật
      { $set: data } // Dữ liệu cần cập nhật
    );
};

const findOneByid = async (id) => {
  try {
    const result = await GET_DB()
      .collection(MENU_COLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findMenuChild = async (id) => {
  try {
    const result = await GET_DB()
      .collection(MENU_COLECTION_NAME)
      .find({
        parentId: id,
      })
      .toArray();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteOne = async (id) => {
  try {
    const result = await GET_DB()
      .collection(MENU_COLECTION_NAME)
      .deleteOne({
        _id: new ObjectId(id),
      });

    return result.deletedCount;
  } catch (error) {
    throw new Error(error);
  }
};




export const menuModel = {
  MENU_COLECTION_NAME,
  MENU_COLECTION_SCHEMA,
  createNew,
  findOneByid,
  findAll,
  update,
  deleteOne,
  findMenuChild,
  findAllMenuParent,
  findAllMenuChildrent
};
