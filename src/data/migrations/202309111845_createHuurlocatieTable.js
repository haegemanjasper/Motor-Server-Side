const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.huurlocatie, (table) => {
      table.increments('id'); 

      table.string('name', 255).notNullable(); 

      table.unique('name', 'idx_huurlocatie_name_unique'); 
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.huurlocatie);
  },
};
