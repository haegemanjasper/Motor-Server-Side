const { tables } = require('..');

module.exports = {

  seed: async (knex) => {
    await knex(tables.betaling).delete();

    await knex(tables.betaling).insert([
      {  
        id: 1,
        klant_id: 1,
        huurlocatie_id: 1,
        bedrag: 50,
        betaalmethode: 'bancontact',
        datum: new Date(2023, 11, 10, 23, 0),
        
      },
      { 
        id: 2,
        klant_id: 2,
        huurlocatie_id: 2,
        bedrag: 100,
        betaalmethode: 'paypal',
        datum: new Date(2023, 11, 11, 23, 0),
      },
      { 
        id: 3,
        klant_id: 3,
        huurlocatie_id: 3,
        bedrag: 150,
        betaalmethode: 'bancontact',
        datum: new Date(2021, 11, 12, 23, 0),
      },

    ]);
  },
}