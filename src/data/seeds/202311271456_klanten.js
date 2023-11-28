const {tables} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.klant).delete();

    await knex(tables.klant).insert([
      {
        id: 1,
        naam: 'Van den Broeck',
        voornaam: 'Jan',
        email: 'jan.vdb@hotmail.com',
        straat: 'Sluipweg',
        huisnummer: 31,
        postcode: 9000,
        stad: 'Gent',
        //roles: ['admin', 'klant'],
      
      },

      {
        id: 2,
        naam: 'De Smet',
        voornaam: 'Jef',
        email: 'jef.ds@hotmail.com',
        straat: 'Kortrijksesteenweg',
        huisnummer: 11,
        postcode: 9200,
        stad: 'Dendermonde',
        //roles: ['klant'],

      },

      {
        id: 3,
        naam: 'De Vos',
        voornaam: 'Johan',
        email: 'johan.dv@hotmail.com',
        straat: 'Kouter',
        huisnummer: 1,
        postcode: 9300,
        stad: 'Aalst',
        //roles: ['klant'],

      },
    ]);
  },
};