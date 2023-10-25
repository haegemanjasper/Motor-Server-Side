const Koa = require('koa');
const Router = require('@koa/router');
const config = require('config'); 
const bodyParser = require('koa-bodyparser');
const winston = require('winston');
const NODE_ENV = config.get('env'); 
const LOG_LEVEL = config.get('log.level'); 
const LOG_DISABLED = config.get('log.disabled'); 
const motors = require('./service/motoren');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`); // 👈 3

const app = new Koa();
const router = new Router();


app.use(bodyParser());

const logger = winston.createLogger({
  level: LOG_LEVEL, 
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ silent: LOG_DISABLED }) 
  ]
});


router.get('/api/motors', async (ctx) => { 
  //ctx.body = '[{"user": "Benjamin", "amount": 100, "place": "Irish Pub", "date": "2021-08-15" }]'; // 👈 5
  ctx.body = motors.getAll();
});

app.use(router.routes()) 
   .use(router.allowedMethods()); 


app.listen(9000, () => {
  logger.info('🚀 Server listening on http://localhost:9000');
});
