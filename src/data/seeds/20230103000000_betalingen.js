const { tables } = require('..');

module.exports = {

  seed: async (knex) => {
    await knex(tables.betaling).delete();

    await knex(tables.betaling).insert([
      {  
        betaling_id: 1,
        betalingsmethode: 'Bancontact',
        betaalstatus: 'Betaald',
        bedrag: 150,
        
      },
      { 
        betaling_id: 2,
        betalingsmethode: 'Paypal',
        betaalstatus: 'Betaald',
        bedrag: 100,
      },
      { 
        betaling_id: 3,
        betalingsmethode: 'Paypal',
        betaalstatus: 'Betaald',
        bedrag: 50,
      },

    ]);
  },
};