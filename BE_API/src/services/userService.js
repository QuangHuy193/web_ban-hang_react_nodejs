import { userModel } from "~/models/userModel";

const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

const createNew = async (resBody) => {
  try {
    const hasspass = await hashPassword(resBody.pass);
    const newUser = {
      ...resBody,
      pass: hasspass,
    };

    //goi model
    const createNew = await userModel.createNew(newUser);

    return await userModel.findOneByid(createNew.insertedId);
  } catch (error) {
    throw error;
  }
};

const getUserWithSignIn = async (resBody) => {
  try {
    const newUser = {
      ...resBody,
    };

    return await userModel.getUserWithSignIn(newUser);
  } catch (error) {
    throw error;
  }
};

const update = async (resBody) => {
  try {
    const { id, ...newUser } = resBody;

    //goi model
    const Updated = await userModel.update(id, newUser);

    return await userModel.findOneByid(id);
  } catch (error) {
    throw error;
  }
};

const findAll = async (resBody) => {
  try {
    //goi model
    const result = await userModel.findAll();

    return result;
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  try {
    //goi model
    const result = await userModel.findOneByid(id)

    return result;
  } catch (error) {
    throw error;
  }
};

export const userService = {
  createNew,
  getUserWithSignIn,
  update,
  findAll,
  findUserById
};
