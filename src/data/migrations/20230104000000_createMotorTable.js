const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.motor, (table) => {
      table.increments('id');

      table.integer('motor_id').unsigned().notNullable();
      table.dateTime('datum').notNullable();
      table.boolean('beschikbaarheid').notNullable();
      table.decimal('huurprijs_per_dag').notNullable();
      table.string('merk', 50).notNullable();
      table.string('model', 50).notNullable();
      table.integer('rating').notNullable();

      table.unique('motor_id', 'idx_motor_id_unique');

      // Vreemde sleutel voor klant_id
      table.integer('klant_id').unsigned().notNullable();
      table.foreign('klant_id', 'fk_motor_klant')
        .references(`${tables.klant}.id`)
        .onDelete('CASCADE');

      // Vreemde sleutel voor huurlocatie_id
      table.integer('huurlocatie_id').unsigned().notNullable();
      table.foreign('huurlocatie_id', 'fk_motor_huurlocatie')
        .references(`${tables.huurlocatie}.id`)
        .onDelete('CASCADE');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.motor);
  },
};
