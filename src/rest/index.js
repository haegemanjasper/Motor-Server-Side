const Router = require('@koa/router');
const installMotorRouter = require('./motoren');
const installHealthRoutes = require('./health');

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installMotorRouter(router);
  installHealthRoutes(router);

  app.use(router.routes())
     .use(router.allowedMethods());
};
