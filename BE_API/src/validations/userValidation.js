import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validator";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().max(50).trim().strict().messages({
      "string.max": "Mật khẩu tối đa 50 kí tự",
    }),
    email: Joi.string().email().required().trim().strict(), // Email hợp lệ
    pass: Joi.string().min(8).max(128).required().messages({
      "string.min": "Mật khẩu tối thiểu gồm 8 kí tự",
      "string.max": "Mật khẩu tối đa 128 kí tự",
    }), // Mật khẩu
    address: Joi.string().max(255).trim().strict().messages({
      "string.max": "Địa chỉ tối đa 255 kí tự",
    }), // Địa chỉ người dùng
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .trim()
      .messages({
        "string.pattern": "Số điện thoại gồm 10 chữ số",
      }), // Số điện thoại (10-15 chữ số)
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    // validation da hop le se den controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const signIn = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().trim().strict(), // Email hợp lệ
    pass: Joi.string().min(8).max(128).required().messages({
      "string.min": "Mật khẩu tối thiểu gồm 8 kí tự",
      "string.max": "Mật khẩu tối đa 128 kí tự",
    }), // Mật khẩu
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    // validation da hop le se den controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string().required().min(3).max(50).trim().strict(),
    email: Joi.string().email().required().trim().strict(), // Email hợp lệ
    address: Joi.string().max(255).trim().strict(), // Địa chỉ người dùng
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .trim(), // Số điện thoại (10-15 chữ số)
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    // validation da hop le se den controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const userValidation = {
  createNew,
  signIn,
  update,
};
