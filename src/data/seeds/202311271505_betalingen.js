const { tables } = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.betaling).delete();

        await knex(tables.betaling).insert([
            {
                id: 1,
                klant_id: 2,
                huurlocatie_id: 2,
                bedrag: 300,
                betaalmethode: "bancontact",
                datum: new Date(2024, 8, 12, 15, 0),
            },

            {
                id: 2,
                klant_id: 2,
                huurlocatie_id: 1,
                bedrag: 150,
                betaalmethode: "paypal",
                datum: new Date(2024, 6, 11, 14, 0),
            },
            {
                id: 3,
                klant_id: 3,
                huurlocatie_id: 3,
                bedrag: 150,
                betaalmethode: "bancontact",
                datum: new Date(2024, 3, 12, 15, 0),
            },

            {
                id: 4,
                klant_id: 3,
                huurlocatie_id: 2,
                bedrag: 150,
                betaalmethode: "paypal",
                datum: new Date(2024, 5, 27, 14, 0),
            },
        ]);
    },
};
