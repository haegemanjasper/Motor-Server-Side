const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.klant, (table) => {
     table.increments('id').primary();

      table.string('naam', 255).notNullable();

      table.string('voornaam', 255).notNullable();

      table.string('email', 255).notNullable();

      table.string('straat', 255).notNullable();

      table.integer('huisnummer').notNullable();

      table.integer('postcode').notNullable();
      
      table.string('stad', 255).notNullable();

      //table.string('roles', 255).notNullable();
    
    });
  },

  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.klant);
  }
};
