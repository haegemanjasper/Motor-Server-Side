const Joi = require('joi');
const Router = require('@koa/router');
const huurlocatieService = require('../service/huurlocatie');
const validate = require('../core/validation');

const getAllHuurlocatie = async (ctx) => {
  ctx.body = await huurlocatieService.getAll();
};

getAllHuurlocatie.validationScheme = null;

const createHuurlocatie = async (ctx) => {
  const newHuurlocatie = await huurlocatieService.create({
    ...ctx.request.body,
  });
  ctx.status = 201;
  ctx.body = newHuurlocatie;
};

createHuurlocatie.validationScheme = {
  body: {
    huurlocatie_id: Joi.number().positive().required(),
    straat: Joi.string().max(255).required(),
    huisnummer: Joi.number().positive().required(),
    postcode: Joi.number().positive().required(),
  },
};

const getHuurlocatieById = async (ctx) => {
  ctx.body = await huurlocatieService.getById(Number(ctx.params.id));
};

getHuurlocatieById.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

const updateHuurlocatie = async (ctx) => {
  ctx.body = await huurlocatieService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

updateHuurlocatie.validationScheme = {
  body: {
    huurlocatie_id: Joi.number().positive().required(),
    straat: Joi.string().max(255).required(),
    huisnummer: Joi.number().positive().required(),
    postcode: Joi.number().positive().required(),
  },
  params: {
    id: Joi.number().positive().required(),
  },
};

const deleteHuurlocatie = async (ctx) => {
  await huurlocatieService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteHuurlocatie.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/huurlocaties',
  });

  router.get('/', validate(getAllHuurlocatie.validationScheme), getAllHuurlocatie);
  router.post('/', validate(createHuurlocatie.validationScheme), createHuurlocatie);
  router.get('/:id', validate(getHuurlocatieById.validationScheme), getHuurlocatieById);
  router.put('/:id', validate(updateHuurlocatie.validationScheme), updateHuurlocatie);
  router.delete('/:id', validate(deleteHuurlocatie.validationScheme), deleteHuurlocatie);

  app.use(router.routes()).use(router.allowedMethods());
};
