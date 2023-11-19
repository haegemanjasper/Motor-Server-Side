const Router = require('@koa/router');
const motorService = require('../service/motor');

const getAllMotor = async (ctx) => {
  ctx.body = await motorService.getAll();
};

const createMotor = async (ctx) => {
 const newMotor = await motorService.create({
  ...ctx.request.body,
  huur_locatie: ctx.request.body.huur_locatie,
  klant: ctx.request.body.klant,
  });
  ctx.status = 201;
  ctx.body = newMotor;
 
};

const getMotorById = async (ctx) => {
  
  ctx.body = await motorService.getById(Number(ctx.params.id));
};

const updateMotor = async (ctx) => {
  ctx.body = await motorService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    huur_locatie: ctx.request.body.huur_locatie,
    klant: ctx.request.body.klant,
  });
};

const deleteMotor = async (ctx) => {
  await motorService.deleteById(ctx.params.id);
  ctx.status = 204;
};


// {Router} app
module.exports = (app) => {
  const router = new Router({
    prefix: '/motors',
  });

  router.get('/', getAllMotor);
  router.post('/', createMotor);
  router.get('/:id', getMotorById);
  router.put('/:id', updateMotor);
  router.delete('/:id', deleteMotor);

  app.use(router.routes())
     .use(router.allowedMethods());
};
