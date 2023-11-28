const Router = require('@koa/router');
const installMotorRouter = require('./motor');
const installHuurlocatieRouter = require('./huurlocatie');
const installKlantRouter = require('./klant');
const installBetalingRouter = require('./betaling');
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
  installHuurlocatieRouter(router);
  installKlantRouter(router);
  installBetalingRouter(router);
  installHealthRoutes(router);

  app.use(router.routes())
     .use(router.allowedMethods());
};
