const {tables} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.klant).delete();

    await knex(tables.klant).insert([
      {
        klantId: 1,
        naam: 'Van den Broeck',
        voornaam: 'Jan',
        straat: 'Sluipweg',
        huisnummer: 31,
        postcode: 9000,
        stad: 'Gent',
      
      },

      {
        klantId: 2,
        naam: 'De Smet',
        voornaam: 'Jef',
        straat: 'Kortrijksesteenweg',
        huisnummer: 11,
        postcode: 9200,
        stad: 'Dendermonde',

      },

      {

        klantId: 3,
        naam: 'De Vos',
        voornaam: 'Johan',
        straat: 'Kouter',
        huisnummer: 1,
        postcode: 9300,
        stad: 'Aalst',

      },
    ]);
  },
};