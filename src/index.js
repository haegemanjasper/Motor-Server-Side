const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest');
const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const { initializeLogger, getLogger } = require('./core/logging');
const koaCors = require ('@koa/cors');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const { initializeData } = require('./data');

// CORS is een HTTP-functie waarmee een webapplicatie,
// die wordt uitgevoerd onder één domein, toegang kan krijgen tot resources in een ander domein.

async function main() {

initializeLogger({
  level: LOG_LEVEL,
  disabled: LOG_DISABLED,
  defaultMeta: { 
    NODE_ENV, 
  },
});

await initializeData();

}

const app = new Koa();

app.use(koaCors({
  origin: (ctx) => {
    if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
      return ctx.request.header.origin;
    }
    return CORS_ORIGINS[0];
  },
  allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
  maxAge: CORS_MAX_AGE,
}));

app.use(bodyParser());
installRest(app);

app.listen(9000, () => {
  getLogger().info('🚀 Server listening on http://localhost:9000');
});

main();

