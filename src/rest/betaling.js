const Joi = require('joi');
const Router = require('@koa/router');
const betalingService = require('../service/betaling');
const validate = require('../core/validation');

const getAllBetalingen = async (ctx) => {
  ctx.body = await betalingService.getAll();
};

getAllBetalingen.validationScheme = null;

const createBetaling = async (ctx) => {
  const newBetaling = await betalingService.create({
    ...ctx.request.body,
  });
  ctx.status = 201;
  ctx.body = newBetaling;
};

createBetaling.validationScheme = {
  body: {
    betaling_id: Joi.number().positive().required(),
    betalingsmethode: Joi.string().max(255).required(),
    betaalstatus: Joi.string().max(50).required(),
    bedrag: Joi.number().positive().required(),
  },
};

const getBetalingById = async (ctx) => {
  ctx.body = await betalingService.getById(Number(ctx.params.id));
};

getBetalingById.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

const updateBetaling = async (ctx) => {
  ctx.body = await betalingService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

updateBetaling.validationScheme = {
  body: {
    betaling_id: Joi.number().positive().required(),
    betalingsmethode: Joi.string().max(255).required(),
    betaalstatus: Joi.string().max(50).required(),
    bedrag: Joi.number().positive().required(),
  },
  params: {
    id: Joi.number().positive().required(),
  },
};

const deleteBetaling = async (ctx) => {
  await betalingService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteBetaling.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/betalingen',
  });

  router.get('/', validate(getAllBetalingen.validationScheme), getAllBetalingen);
  router.post('/', validate(createBetaling.validationScheme), createBetaling);
  router.get('/:id', validate(getBetalingById.validationScheme), getBetalingById);
  router.put('/:id', validate(updateBetaling.validationScheme), updateBetaling);
  router.delete('/:id', validate(deleteBetaling.validationScheme), deleteBetaling);

  app.use(router.routes()).use(router.allowedMethods());
};
