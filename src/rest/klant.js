const Joi = require('joi');
const Router = require('@koa/router');
const klantService = require('../service/klant');
const validate = require('../core/validation');

const getAllKlanten = async (ctx) => {
  const klanten = await klantService.getAll();
  ctx.body = klanten;
};

getAllKlanten.validationScheme = null;

/*
const register = async (ctx) => {
  const klant = await klantService.register(ctx.request.body);
  ctx.status = 200;
  ctx.body = klant;
};

*/

const getKlantById = async (ctx) => {
  const klant = await klantService.getById(ctx.params.id);
  ctx.status = 200;
  ctx.body = klant;
};

getKlantById.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};


const updateKlantById = async (ctx) => {
  const klant = await klantService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 200;
  ctx.body = klant;
};

updateKlantById.validationScheme = {
  body: {
    naam: Joi.string().max(255).required(),
    voornaam: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    straat: Joi.string().max(255).required(),
    huisnummer: Joi.number().positive().required(),
    postcode: Joi.number().positive().required(),
    stad: Joi.string().max(255).required(),
  },
  params: {
    id: Joi.number().positive().required(),
  },
};

const deleteKlantById = async (ctx) => {
  await klantService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteKlantById.validationScheme = {
  params: {
    id: Joi.number().positive().required(),
  },
};

module.exports = function installKlantRoutes(app) {
  const router = new Router({
    prefix: '/klanten',
  });

  router.get('/', validate(getAllKlanten.validationScheme), getAllKlanten);
  router.get('/:id', validate(getKlantById.validationScheme), getKlantById);
  //router.post('/register', validate(register.validationScheme), register);
  router.put('/:id', validate(updateKlantById.validationScheme), updateKlantById);
  router.delete('/:id', validate(deleteKlantById.validationScheme), deleteKlantById);

  app.use(router.routes()).use(router.allowedMethods());
};
