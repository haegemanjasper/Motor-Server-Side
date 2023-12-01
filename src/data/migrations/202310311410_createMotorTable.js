const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.motor, (table) => {
      table.increments("id").primary();

      table.string("merk", 50).notNullable();

      table.string("model", 50).notNullable();

      table.dateTime("datum").notNullable();

      table.decimal("huurprijs_per_dag").notNullable();

      table.boolean("beschikbaarheid").notNullable();

      table.integer("rating").notNullable();

      table.string("image", 255).notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.motor);
  },
};
