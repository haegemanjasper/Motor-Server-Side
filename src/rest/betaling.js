const Joi = require("joi");
const Router = require("@koa/router");
const betalingService = require("../service/betaling");
const validate = require("../core/validation");
const { requireAuthentication } = require("../core/auth");

const getAllBetalingen = async (ctx) => {
  ctx.body = await betalingService.getAll();
};

getAllBetalingen.validationScheme = null;

const createBetaling = async (ctx) => {
  const newBetaling = await betalingService.create({
    ...ctx.request.body,
    huurlocatieId: Number(ctx.request.body.huurlocatieId),
    klantId: Number(ctx.request.body.klantId),
    datum: new Date(ctx.request.body.datum),
  });
  ctx.status = 201;
  ctx.body = newBetaling;
};

createBetaling.validationScheme = {
  body: {
    klantId: Joi.number().positive().required(),
    huurlocatieId: Joi.number().positive().required(),
    bedrag: Joi.number().positive().required(),
    betaalmethode: Joi.string().max(255).required(),
    datum: Joi.date().required(), // date of datetime?
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
    huurlocatieId: Number(ctx.request.body.huurlocatieId),
    datum: new Date(ctx.request.body.datum),
    klantId: ctx.state.session.klantId,
  });
};

updateBetaling.validationScheme = {
  body: {
    klantId: Joi.number().positive().required(),
    huurlocatieId: Joi.number().positive().required(),
    bedrag: Joi.number().positive().required(),
    betaalmethode: Joi.string().max(255).required(),
    datum: Joi.date().required(),
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
  body: Joi.object({}).unknown(true),
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/betalingen",
  });

  router.use(requireAuthentication);

  router.get(
    "/",
    validate(getAllBetalingen.validationScheme),
    getAllBetalingen
  );
  router.post("/", validate(createBetaling.validationScheme), createBetaling);
  router.get(
    "/:id",
    validate(getBetalingById.validationScheme),
    getBetalingById
  );
  router.put("/:id", validate(updateBetaling.validationScheme), updateBetaling);
  router.delete(
    "/:id",
    validate(deleteBetaling.validationScheme),
    deleteBetaling
  );

  app.use(router.routes()).use(router.allowedMethods());
};
