const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.huurlocatie, (table) => {
      table.increments("id").primary();

      table.string("naam", 255).notNullable();

      table.string("straat", 255).notNullable();

      table.integer("huisnummer").notNullable();

      table.integer("postcode").notNullable();

      table.string("stad", 255).notNullable();

      table.unique("naam", "idx_huurlocatie_naam_unique");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.huurlocatie);
  },
};
