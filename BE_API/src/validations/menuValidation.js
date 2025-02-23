/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict().messages({
      "any.required": "name la bat buoc",
      "string.empty": "name khong duoc rong",
      "string.min": "name toi thieu 3 ky tu",
      "string.max": "name toi da 50 ky tu",
      "string.trim": "name khong duoc co khoang trang dau va cuoi",
    }),
    parentId: Joi.string().allow("")
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    // validation da hop le se den controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message),      
    );
  }
};

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string().required().min(3).max(50).trim().strict().messages({           
      "string.min": "Tên tối thiểu gồm 3 ký tự",
      "string.max": "Tên tối đa 50 ký tự",
      "string.trim": "Tên không được có khoảng trắng ở đầu và cuối",
    }),
    parentId: Joi.string().allow("")
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    // validation da hop le se den controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message),      
    );
  }
};

export const menuValidation = {
  createNew,
  update
};
