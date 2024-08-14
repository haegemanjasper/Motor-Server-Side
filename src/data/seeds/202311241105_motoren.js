const { tables } = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.motor).delete();

        await knex(tables.motor).insert([
            {
                id: 1,
                merk: "BMW",
                model: "R 1250 GS",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 120,
                beschikbaarheid: true,
                rating: 5,
                image: "bmw.png",
            },
            {
                id: 2,
                merk: "Yamaha",
                model: "MT-07",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 85,
                beschikbaarheid: true,
                rating: 4.5,
                image: "yamaha.png",
            },
            {
                id: 3,
                merk: "KTM",
                model: "390 Duke",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 75,
                beschikbaarheid: true,
                rating: 4.7,
                image: "ktm.png",
            },
            {
                id: 4,
                merk: "Honda",
                model: "CB650R",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 90,
                beschikbaarheid: true,
                rating: 4.5,
                image: "honda.png",
            },
            {
                id: 5,
                merk: "Harley Davidson",
                model: "Iron 883",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 110,
                beschikbaarheid: false,
                rating: 4,
                image: "harley.png",
            },
            {
                id: 6,
                merk: "Kawasaki",
                model: "Vulcan 900",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 100,
                beschikbaarheid: false,
                rating: 4,
                image: "kawa.png",
            },
        ]);
    },
};
