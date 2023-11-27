const knex = require('knex'); 
const { getLogger } = require('../core/logging'); 
const { join } = require('path');

// start config
const config = require('config');

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');
// einde config

let knexInstance; 

async function initializeData() {
  const logger = getLogger(); 
  logger.info('Initializing connection to the database'); 

  //  start knex opties (nakijken)
  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
      debug: isDevelopment,
      migrations: {
        tableName: 'knex_meta',
        directory: join('src', 'data', 'migrations'),
      },
      seeds: {
        directory: join('src', 'data', 'seeds'),
    },
  };
  // einde knex opties
  knexInstance = knex(knexOptions); 


  try {
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

    await knexInstance.destroy();

    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    logger.error(error.message, { error }); 
    throw new Error('Could not initialize the data layer'); 
  }

  // run migrations

  try {
    await knexInstance.migrate.latest();
  } catch (error) {
    logger.error('Error while migrating the database', { error });

    logger.info('Migrations failed, check the logs!');
  }

  if (isDevelopment) {
    logger.info('Attempting to seed the database')
    try {
      await knexInstance.seed.run();
    } catch (error) {
      logger.error('Error while seeding the database', { error });
    }
  }
  logger.info('Successfully connected to the database'); 
  return knexInstance; 
}

function getKnex() {
  if (!knexInstance)
    throw new Error(
      'Please initialize the data layer before getting the Knex instance'
    );
  return knexInstance;
}

async function shutdownData() {
  const logger = getLogger();

  logger.info('Shutting down database connection');

  await knexInstance.destroy();
  knexInstance = null;

  logger.info('Database connection closed');
}

const tables = Object.freeze({
  huurlocatie: 'huurlocatie',
  motor: 'motor',
  klant: 'klant',
  betaling: 'betaling',
});

module.exports = {
  tables,
  initializeData, 
  getKnex, 
  shutdownData,
};
