const {tables} = require('..');

module.exports = {

  up: async (knex) => {
    await knex.schema.createTable(tables.betaling, (table) => {
      table.increments('id').primary();

      // Vreemde sleutel voor klant_id
      table.integer('klant_id').unsigned().notNullable();
      table.foreign('klant_id')
          .references(`${tables.klant}.id`)
          .onDelete('CASCADE');

          
      // Vreemde sleutel voor huurlocatie_id
      table.integer('huurlocatie_id').unsigned().notNullable();
      table.foreign('huurlocatie_id')
         .references(`${tables.huurlocatie}.id`)
         .onDelete('CASCADE'); 

      table.integer('bedrag').notNullable();

      table.string('betaalmethode', 50).notNullable();
      
      table.dateTime('datum').notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.betaling);
  },
};