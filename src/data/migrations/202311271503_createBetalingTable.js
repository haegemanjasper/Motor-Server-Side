const {tables} = require('..');

module.exports = {

  up: async (knex) => {
    await knex.schema.createTable(tables.betaling, (table) => {
      //table.increments('id');

      table.increments('betalingId').primary();

      // Vreemde sleutel voor klant_id
      table.integer('klantId').unsigned().notNullable();
      table.foreign('klantId')
          .references(`${tables.klant}.klantId`)
          .onDelete('CASCADE');

          
      // Vreemde sleutel voor huurlocatie_id
      table.integer('huurlocatieId').unsigned().notNullable();
      table.foreign('huurlocatieId')
         .references(`${tables.huurlocatie}.huurlocatieId`)
         .onDelete('CASCADE'); 

      table.integer('bedrag').notNullable();

      table.string('betaalmethode', 50).notNullable();
      
      table.date('datum').notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.betaling);
  },
};