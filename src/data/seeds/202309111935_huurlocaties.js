const { tables } = require('..');

module.exports = {

  seed: async (knex) => {
    await knex(tables.huurlocatie).delete();

    // nog aan te passen locatie
    await knex(tables.huurlocatie).insert([
      { id: 1, name: 'Huurlocatie 1'},
      { id: 2, name: 'Huurlocatie 2'},
      { id: 3, name: 'Huurlocatie 3'},
    ]);
  },
};