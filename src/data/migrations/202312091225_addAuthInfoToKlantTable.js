const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.alterTable(tables.klant, (table) => {
      table.string("password_hash").notNullable();

      table.jsonb("roles").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.alterTable(tables.klant, (table) => {
      table.dropColumns("password_hash", "roles");
    });
  },
};
