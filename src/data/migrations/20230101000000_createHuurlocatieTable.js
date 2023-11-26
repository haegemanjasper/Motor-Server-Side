const { tables } = require('..');

module.exports = {
  up: async (knex) => {
      await knex.schema.createTable(tables.huurlocatie, (table) => {
      table.increments('id'); 

      table.integer('huurlocatie_id').unsigned().notNullable();

      table.string('naam', 255).notNullable();

      table.string('straat', 255).notNullable(); 

      table.integer('huisnummer').notNullable();

      table.integer('postcode').notNullable();

      table.unique('huurlocatie_id', 'idx_huurlocatie_id_unique'); 
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.huurlocatie);
  },
};
