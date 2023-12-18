const Joi = require("joi");
const Router = require("@koa/router");
const klantService = require("../service/klant");
const validate = require("../core/validation");
const zxcvbn = require("zxcvbn");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");

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

const login = async (ctx, next) => {
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
  const token = await klantService.register(ctx.request.body);
  ctx.status = 200;
  ctx.body = token;
};

register.validationScheme = {
  body: {
    naam: Joi.string().max(255),
    voornaam: Joi.string().max(255),
    email: Joi.string().email(),
    straat: Joi.string().max(255),
    huisnummer: Joi.number().positive(),
    postcode: Joi.number().positive(),
    stad: Joi.string().max(255),
    password: Joi.string().min(8).max(30), // of PasswordSchema?
  },
};

const getKlantById = async (ctx) => {
  const klant = await klantService.getById(ctx.params.id);
  ctx.status = 200;
  ctx.body = klant;
};

getKlantById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updateKlantById = async (ctx) => {
  const klant = await klantService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 200;
  ctx.body = klant;
};

updateKlantById.validationScheme = {
  body: {
    naam: Joi.string().max(255),
    voornaam: Joi.string().max(255),
    email: Joi.string().email(),
    straat: Joi.string().max(255),
    huisnummer: Joi.number().positive(),
    postcode: Joi.number().positive(),
    stad: Joi.string().max(255),
  },
  params: {
    id: Joi.number().positive(),
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

const checkKlantId = (ctx, next) => {
  const { klantId, roles } = ctx.state.session;
  const { id } = ctx.params;

  // You can only get our own data unless you're an admin
  if (id !== klantId && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      "You are not allowed to view this user's information",
      {
        code: "FORBIDDEN",
      }
    );
  }
  return next();
};

module.exports.passwordSchema = passwordSchema;
module.exports = function installKlantRoutes(app) {
  const router = new Router({
    prefix: "/klanten",
  });

  // public routes
  router.post("/register", validate(register.validationScheme), register);
  router.post("/login", validate(login.validationScheme), login);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  // Routes with authentication and authorization
  router.get(
    "/",
    requireAuthentication,
    requireAdmin,
    validate(getAllKlanten.validationScheme),
    getAllKlanten
  );
  router.get(
    "/:id",
    requireAuthentication,
    validate(getKlantById.validationScheme),
    checkKlantId,
    getKlantById
  );

  router.put(
    "/:id",
    requireAuthentication,
    validate(requireAuthentication, updateKlantById.validationScheme),
    checkKlantId,
    updateKlantById
  );
  router.delete(
    "/:id",
    requireAuthentication,
    validate(deleteKlantById.validationScheme),
    checkKlantId,
    deleteKlantById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
