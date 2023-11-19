const Router = require('@koa/router');
const motors = require('../service/motoren');

const getAllMotor = async (ctx) => {
  ctx.body = motors.getAll();
};

const createMotor = async (ctx) => {
  const { name, price, date, available, rating, image, klant, huur_locatie } = ctx.request.body;

  const newMotor = motors.create({
    name,
    price,
    date: new Date(date),
    available,
    rating,
    image,
    klant,
    huur_locatie,
  });

  ctx.body = newMotor;
};

const getMotorById = async (ctx) => {
  
  ctx.body = motors.getById(Number(ctx.params.id));
};

const updateMotor = async (ctx) => {
  const updatedMotor = motors.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
  });

  if (updatedMotor) {
    ctx.body = updatedMotor;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Motor not found' };
  }
};

const deleteMotor = async (ctx) => {
  const deletedMotor = motors.deleteById(Number(ctx.params.id));

  if (deletedMotor) {
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Motor not found' };
  }
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
