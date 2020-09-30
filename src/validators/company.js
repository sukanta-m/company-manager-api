const Joi = require('joi');

const companyCreateSchema = Joi.object({
  name: Joi.string()
      .required(),
  address: Joi.string(),
  state: Joi.string(),
  entityType: Joi.string(),
  planId: Joi.number()
      .integer(),
  representatives: Joi.array()
});

module.exports = {
  companyCreateSchema
};
