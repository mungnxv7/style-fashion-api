import Joi from "joi";

const createVoucher = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    code: Joi.string().required(),
    validFrom: Joi.date().required(),
    validTo: Joi.date().required().greater(Joi.ref("validFrom")).messages({
      "date.greater": "validTo must be greater than validFrom",
    }),
    discount: Joi.number().required(),
    type: Joi.string().valid("percentage", "amount").required(),
    exclude_promotions: Joi.boolean().required(),
    active: Joi.boolean(),
  }),
};
export { createVoucher };
