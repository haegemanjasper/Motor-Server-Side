const Joi = require('joi');
const Router = require('@koa/router');
const motorService = require('../service/motor');
const validate = require('../core/validation');

const getAllMotor = async (ctx) => {
  ctx.body = await motorService.getAll();
};

getAllMotor.validationScheme = null;

const createMotor = async (ctx) => {
  const newMotor = await motorService.create({
    ...ctx.request.body,
    huurlocatie: ctx.request.body.huurlocatie,
    klant: ctx.request.body.klant,
  });
  ctx.status = 201;
  ctx.body = newMotor;
};

createMotor.validationScheme = {
  body: {
    motor_id: Joi.number().positive().required(),
    datum: Joi.date().required(),
    beschikbaarheid: Joi.boolean().required(),
    huurprijs_per_dag: Joi.number().positive().required(),
    merk: Joi.string().max(50).required(),
    model: Joi.string().max(50).required(),
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
    huur_locatie: ctx.request.body.huur_locatie,
    klant: ctx.request.body.klant,
  });
};

updateMotor.validationScheme = {
  body: {
    motor_id: Joi.number().positive().required(),
    datum: Joi.date().required(),
    beschikbaarheid: Joi.boolean().required(),
    huurprijs_per_dag: Joi.number().positive().required(),
    merk: Joi.string().max(50).required(),
    model: Joi.string().max(50).required(),
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

  router.get('/', validate(getAllMotor.validationScheme), getAllMotor);
  router.post('/', validate(createMotor.validationScheme), createMotor);
  router.get('/:id', validate(getMotorById.validationScheme), getMotorById); 
  router.put('/:id', validate(updateMotor.validationScheme), updateMotor);
  router.delete('/:id', validate(deleteMotor.validationScheme), deleteMotor);

  app.use(router.routes())
     .use(router.allowedMethods());
};
