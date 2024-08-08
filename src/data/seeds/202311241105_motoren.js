const { tables } = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.motor).delete();

        await knex(tables.motor).insert([
            {
                id: 1,
                merk: "BMW",
                model: "testmodel",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 150,
                beschikbaarheid: true,
                rating: 4,
                image: "bmw.png",
            },
            {
                id: 2,
                merk: "Yamaha",
                model: "testmodel",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 100,
                beschikbaarheid: true,
                rating: 5,
                image: "yamaha.png",
            },
            {
                id: 3,
                merk: "KTM",
                model: "testmodel",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 50,
                beschikbaarheid: true,
                rating: 3,
                image: "ktm.png",
            },
            {
                id: 4,
                merk: "Honda",
                model: "testmodel",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 75,
                beschikbaarheid: true,
                rating: 4,
                image: "honda.png",
            },
            {
                id: 5,
                merk: "Harley Davidson",
                model: "testmodel",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 75,
                beschikbaarheid: false,
                rating: 4,
                image: "harley.png",
            },
            {
                id: 6,
                merk: "Kawasaki",
                model: "testmodel",
                datum: new Date(2021, 4, 10, 10, 0),
                huurprijs_per_dag: 75,
                beschikbaarheid: false,
                rating: 4,
                image: "kawa.png",
            },
        ]);
    },
};
