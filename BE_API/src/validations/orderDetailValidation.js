import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validator";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    product_id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE), // Tham chiếu đến _id của `products`
    number: Joi.number().integer().min(1).required(),
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

export const orderDetailValidation = {
  createNew,
};
