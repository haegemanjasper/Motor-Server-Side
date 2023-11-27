const { tables } = require('..');

module.exports = {

  seed: async (knex) => {
    await knex(tables.huurlocatie).delete();

    await knex(tables.huurlocatie).insert([
      {  
        huurlocatieId: 1,
        naam: 'MotoHaven',
        straat: 'Sluipweg',
        huisnummer: 31,
        postcode: 9000,
        stad: 'Gent',
      },
      { 
        huurlocatieId: 2,
        naam: 'SpeedCruisers Rentals',
        straat: 'Spanweg',
        huisnummer: 75,
        postcode: 9200,
        stad: 'Dendermonde',
      },
      { 
        huurlocatieId: 3,
        naam: 'RideRevolution Motors',
        straat: 'Steenakkerwegel',
        huisnummer: 27,
        postcode: 9300,
        stad: 'Aalst',
      },

    ]);
  },
};