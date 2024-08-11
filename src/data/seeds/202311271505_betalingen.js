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
                betaalmethode: "Visa",
                datum: new Date(2024, 8, 12, 15, 0),
            },

            {
                id: 2,
                klant_id: 2,
                huurlocatie_id: 1,
                bedrag: 150,
                betaalmethode: "Bancontact",
                datum: new Date(2024, 6, 11, 14, 0),
            },

            {
                id: 3,
                klant_id: 2,
                huurlocatie_id: 1,
                bedrag: 150,
                betaalmethode: "PayPal",
                datum: new Date(2024, 6, 5, 14, 0),
            },
            {
                id: 4,
                klant_id: 3,
                huurlocatie_id: 3,
                bedrag: 150,
                betaalmethode: "Bancontact",
                datum: new Date(2024, 3, 12, 15, 0),
            },

            {
                id: 5,
                klant_id: 3,
                huurlocatie_id: 2,
                bedrag: 150,
                betaalmethode: "Visa",
                datum: new Date(2024, 5, 27, 14, 0),
            },

            {
                id: 6,
                klant_id: 3,
                huurlocatie_id: 2,
                bedrag: 150,
                betaalmethode: "PayPal",
                datum: new Date(2024, 5, 7, 14, 0),
            },
        ]);
    },
};
