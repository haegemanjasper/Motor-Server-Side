const Router = require('koa-router');
const huurlocatieService = require('../service/huurlocatie');

const getAllHuurlocatie = async (ctx) => {
  ctx.body = await huurlocatieService.getAll();
};

const createHuurlocatie = async (ctx) => {
  const huurlocatie = await huurlocatieService.create({
    ...ctx.request.body,
  });
  ctx.status = 201;
  ctx.body = huurlocatie;
};

const getHuurlocatieById = async (ctx) => {
 ctx.body = await huurlocatieService.getById(Number(ctx.params.id));
  
};

const updateHuurlocatie = async (ctx) => {
  ctx.body = await huurlocatieService.getById(Number(ctx.params.id),
    { ...ctx.request.body },
  );
};

const deleteHuurlocatie = async (ctx) => {
  await huurlocatieService.deleteById(ctx.params.id);
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/huurlocatie',
  });

  router.get('/', getAllHuurlocatie);
  router.post('/', createHuurlocatie);
  router.get('/:id', getHuurlocatieById);
  router.put('/:id', updateHuurlocatie);
  router.delete('/:id', deleteHuurlocatie);

  app.use(router.routes()).use(router.allowedMethods());
};
