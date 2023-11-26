const Joi = require('joi');
const Router = require('@koa/router');
const klantService = require('../service/klant');
const validate = require('../core/validation');

const getAllKlanten = async (ctx) => {
  ctx.body = await klantService.getAll();
};

getAllKlanten.validationScheme = null;

const createKlant = async (ctx) => {
  const newKlant = await klantService.create({
    ...ctx.request.body,
  });
  ctx.status = 201;
  ctx.body = newKlant;
};

createKlant.validationScheme = {
  body: {
    klant_id: Joi.number().positive().required(),
    voornaam: Joi.string().max(255).required(),
    achternaam: Joi.string().max(255).required(),
    straat: Joi.string().max(255).required(),
    huisnummer: Joi.number().positive().required(),
    postcode: Joi.number().positive().required(),
  },
};

const getKlantById = async (ctx) => {
  ctx.body = await klantService.getById(Number(ctx.params.id));
};

getKlantById.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

const updateKlant = async (ctx) => {
  ctx.body = await klantService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

updateKlant.validationScheme = {
  body: {
    klant_id: Joi.number().positive().required(),
    voornaam: Joi.string().max(255).required(),
    achternaam: Joi.string().max(255).required(),
    straat: Joi.string().max(255).required(),
    huisnummer: Joi.number().positive().required(),
    postcode: Joi.number().positive().required(),
  },
  params: {
    id: Joi.number().positive().required(),
  },
};

const deleteKlant = async (ctx) => {
  await klantService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteKlant.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/klanten',
  });

  router.get('/', validate(getAllKlanten.validationScheme), getAllKlanten);
  router.post('/', validate(createKlant.validationScheme), createKlant);
  router.get('/:id', validate(getKlantById.validationScheme), getKlantById);
  router.put('/:id', validate(updateKlant.validationScheme), updateKlant);
  router.delete('/:id', validate(deleteKlant.validationScheme), deleteKlant);

  app.use(router.routes()).use(router.allowedMethods());
};
