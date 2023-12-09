const Joi = require("joi");
const Router = require("@koa/router");
const klantService = require("../service/klant");
const validate = require("../core/validation");
const zxcvbn = require("zxcvbn");

const passwordStrengthValidator = (value, helpers) => {
  const result = zxcvbn(value);

  if (result.score < 3) {
    const message = result.feedback.warning || "Password is too weak";
    return helpers.error("password.tooWeak", { message });
  }

  return value;
};

const passwordSchema = Joi.string()
  .min(8)
  .custom(passwordStrengthValidator, "Custom Password Strength")
  .required();

const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const token = await klantService.login(email, password);
  ctx.body = token;
};
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

const getAllKlanten = async (ctx) => {
  const klanten = await klantService.getAll();
  ctx.body = klanten;
};

getAllKlanten.validationScheme = null;

const register = async (ctx) => {
  const klant = await klantService.register(ctx.request.body);
  ctx.status = 200;
  ctx.body = klant;
};

register.validationScheme = {
  body: {
    naam: Joi.string().max(255).required(),
    voornaam: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    straat: Joi.string().max(255).required(),
    huisnummer: Joi.number().positive().required(),
    postcode: Joi.number().positive().required(),
    stad: Joi.string().max(255).required(),
    password: passwordSchema,
  },
};

const createKlant = async (ctx) => {
  const newKlant = await klantService.create({
    ...ctx.request.body,
  });
  ctx.status = 201;
  ctx.body = newKlant;
};

createKlant.validationScheme = {
  body: {
    naam: Joi.string().max(255).required(),
    voornaam: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    straat: Joi.string().max(255).required(),
    huisnummer: Joi.number().positive().required(),
    postcode: Joi.number().positive().required(),
    stad: Joi.string().max(255).required(),
  },
};

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
  body: Joi.object({}).unknown(true),
};

module.exports.passwordSchema = passwordSchema;
module.exports = function installKlantRoutes(app) {
  const router = new Router({
    prefix: "/klanten",
  });

  router.get("/", validate(getAllKlanten.validationScheme), getAllKlanten);
  router.get("/:id", validate(getKlantById.validationScheme), getKlantById);
  router.post("/", validate(createKlant.validationScheme), createKlant);
  router.post("/register", validate(register.validationScheme), register);
  router.post("/login", validate(login.validationScheme), login);
  router.put(
    "/:id",
    validate(updateKlantById.validationScheme),
    updateKlantById
  );
  router.delete(
    "/:id",
    validate(deleteKlantById.validationScheme),
    deleteKlantById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
