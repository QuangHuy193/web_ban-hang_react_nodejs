import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validator";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    thumbail: Joi.string().required(), // Đường dẫn URL của ảnh
    name: Joi.string().min(3).max(50).required().trim(), // Tên sản phẩm
    description: Joi.string().max(500).optional().trim(), // Mô tả sản phẩm
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
      .message(OBJECT_ID_RULE_MESSAGE),
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
      .message(OBJECT_ID_RULE_MESSAGE),
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

export const productValidation = {
  createNew,
  update,
};
