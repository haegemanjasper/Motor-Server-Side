const Koa = require('koa');
const Router = require('@koa/router');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const winston = require('winston');
const motors = require('./service/motoren');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`);

const app = new Koa();
const router = new Router();

app.use(bodyParser());

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ silent: LOG_DISABLED }),
  ],
});

router.get('/api/motors', async (ctx) => {
  ctx.body = motors.getAll(); 
});

router.post('/api/motors', async (ctx) => {
  try {
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
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9000, () => {
  logger.info('🚀 Server listening on http://localhost:9000');
});
