const { tables } = require('..');

module.exports = {

  seed: async (knex) => {
    await knex(tables.betaling).delete();

    await knex(tables.betaling).insert([
      {  
        betalingId: 1,
        klantId: 1,
        huurlocatieId: 1,
        bedrag: 50,
        betaalmethode: 'bancontact',
        datum: '2023-11-27',
        
      },
      { 
        betalingId: 2,
        klantId: 2,
        huurlocatieId: 2,
        bedrag: 100,
        betaalmethode: 'paypal',
        datum: '2023-11-27',
      },
      { 
        betalingId: 3,
        klantId: 3,
        huurlocatieId: 3,
        bedrag: 150,
        betaalmethode: 'bancontact',
        datum: '2023-11-30',
      },

    ]);
  },
}