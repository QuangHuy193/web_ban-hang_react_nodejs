import Joi, { array, string } from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().trim().required(),
    name: Joi.string().min(5).max(100).trim().required().messages({
      "string.min": "Tên khách hàng tối thiểu gồm 5 ký tự",
    }),
    city: Joi.number().integer().required(),
    district: Joi.string().min(3).max(50).trim().required().messages({
      "string.min": "Tên quận/huyênh tối thiểu gồm 3 ký tự",
    }),
    ward: Joi.string().min(3).max(50).required().trim().messages({
      "string.min": "Tên xã/phường tối thiểu gồm 3 ký tự",
    }),
    address: Joi.string().min(5).max(150).required().trim().messages({
      "string.min": "Địa chỉ nhận hàng tối thiểu gồm 5 ký tự",
    }),
    phone: Joi.string().min(10).trim().required(),
    products: Joi.array().required(),
    total: Joi.number().integer().min(0).required(),
    create_at: Joi.date().timestamp("javascript").default(Date.now), // Thời gian tạo đơn hàng
    status: Joi.string()
      .valid("pending", "completed", "canceled")
      .default("pending"),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const orderValidation = {
  createNew,
};
