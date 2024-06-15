import Joi from "joi";

const getDistrict = {
  query: Joi.object().keys({
    cityId: Joi.string().required(),
  }),
};

const getWard = {
  query: Joi.object().keys({
    districtId: Joi.string().required(),
  }),
};

export { getDistrict, getWard };
