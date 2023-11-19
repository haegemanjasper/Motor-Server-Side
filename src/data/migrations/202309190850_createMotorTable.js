const { tables } = require('..');

module.exports = {
  up: async (knex) => {

    const tableExists = await knex.schema.hasTable(tables.motor);

    if (!tableExists) {
    await knex.schema.createTable(tables.motor, (table) => {
      table.increments('id');

      table.integer('motor_id').unsigned().notNullable();

      table.dateTime('jaar').notNullable();

      table.boolean('beschikbaarheid').notNullable();

      table.decimal('huurprijs_per_dag').notNullable();

      table.string('merk', 50).notNullable();

      table.string('model', 50).notNullable();

      // rating toevoegen?

      // foreign keys

      table.foreign('klant_id', 'fk_klant_id').references(`${tables.klant}.id`).onDelete('CASCADE');

      table.foreign('huurlocatie_id', 'fk_huurlocatie_id').references(`${tables.huurlocatie}.id`).onDelete('CASCADE');
  });
    }
},
down: (knex) => {
    return knex.schema.dropTableIfExists(tables.motor);
  },
};
