const Joi = require('joi');
const Router = require('@koa/router');
const motorService = require('../service/motor');
const validate = require('../core/validation');

const getAllMotors = async (ctx) => {
  ctx.body = await motorService.getAll();
};

getAllMotors.validationScheme = null;

const createMotor = async (ctx) => {
  const newMotor = await motorService.create({
    ...ctx.request.body,
  });
  ctx.status = 201;
  ctx.body = newMotor;
};

createMotor.validationScheme = {
  body: {
    merk: Joi.string().max(50).required(),
    model: Joi.string().max(50).required(),
    datum: Joi.date().required(), // date of datetime?
    huurprijs_per_dag: Joi.number().positive().required(),
    beschikbaarheid: Joi.boolean().required(),
    rating: Joi.number().positive().required(),
  },
};

const getMotorById = async (ctx) => {
  ctx.body = await motorService.getById(Number(ctx.params.id));
};

getMotorById.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

const updateMotor = async (ctx) => {
  ctx.body = await motorService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

updateMotor.validationScheme = {
  body: {
    merk: Joi.string().max(50).required(),
    model: Joi.string().max(50).required(),
    datum: Joi.date().required(), // date of datetime?
    huurprijs_per_dag: Joi.number().positive().required(),
    beschikbaarheid: Joi.boolean().required(),
    rating: Joi.number().positive().required(),
  },
  params: {
    id: Joi.number().positive().required(),
  },
};

const deleteMotor = async (ctx) => {
  await motorService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteMotor.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

// {Router} app
module.exports = (app) => {
  const router = new Router({
    prefix: '/motors',
  });

  router.get('/', validate(getAllMotors.validationScheme), getAllMotors);
  router.post('/', validate(createMotor.validationScheme), createMotor);
  router.get('/:id', validate(getMotorById.validationScheme), getMotorById); 
  router.put('/:id', validate(updateMotor.validationScheme), updateMotor);
  router.delete('/:id', validate(deleteMotor.validationScheme), deleteMotor);

  app.use(router.routes()).use(router.allowedMethods());
};
