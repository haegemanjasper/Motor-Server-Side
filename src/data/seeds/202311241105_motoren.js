const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.motor).delete();

    await knex(tables.motor).insert([
      {
        //  images toevoegen?
        id: 1,
        merk: "KTM",
        model: "1290 Super Duke R",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 150,
        beschikbaarheid: true,
        rating: 4,
        image: "foto3.png",
      },
      {
        id: 2,
        merk: "KTM",
        model: "790 Duke",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 100,
        beschikbaarheid: true,
        rating: 5,
        image: "foto3.png",
      },
      {
        id: 3,
        merk: "KTM",
        model: "390 Duke",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 50,
        beschikbaarheid: true,
        rating: 3,
        image: "foto3.png",
      },
      {
        id: 4,
        merk: "KTM",
        model: "690 Enduro R",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: true,
        rating: 4,
        image: "foto3.png",
      },
      {
        id: 5,
        merk: "KTM",
        model: "450 EXC-F Six Days",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: false,
        rating: 4,
        image: "foto3.png",
      },
      {
        id: 6,
        merk: "KTM",
        model: "250 SX-F",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 50,
        beschikbaarheid: true,
        rating: 4,
        image: "foto3.png",
      },
      {
        // BMW
        id: 7,
        merk: "BMW",
        model: "S 1000 RR",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 150,
        beschikbaarheid: true,
        rating: 4,
        image: "bmw1.png",
      },
      {
        id: 8,
        merk: "BMW",
        model: "S 1000 XR",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 130,
        beschikbaarheid: true,
        rating: 4,
        image: "bmw1.png",
      },

      {
        id: 9,
        merk: "BMW",
        model: "R 1250 GS",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 150,
        beschikbaarheid: true,
        rating: 4,
        image: "bmw1.png",
      },
      {
        id: 10,
        merk: "BMW",
        model: "R 1250 GS Adventure",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 130,
        beschikbaarheid: true,
        rating: 4,
        image: "bmw1.png",
      },
      {
        id: 11,
        merk: "BMW",
        model: "R 1250 RT",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 120,
        beschikbaarheid: true,
        rating: 4,
        image: "bmw1.png",
      },
      {
        id: 12,
        merk: "BMW",
        model: "C400X",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: true,
        rating: 3,
        image: "bmw1.png",
      },
      {
        // Honda
        id: 13,
        merk: "Honda",
        model: "CBR1000RR-R Fireblade SP",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 150,
        beschikbaarheid: true,
        rating: 4,
        image: "honda1.png",
      },
      {
        id: 14,
        merk: "Honda",
        model: "Africa Twin",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 130,
        beschikbaarheid: true,
        rating: 5,
        image: "honda1.png",
      },
      {
        id: 15,
        merk: "Honda",
        model: "CBR650R",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 100,
        beschikbaarheid: true,
        rating: 4,
        image: "honda1.png",
      },
      {
        id: 16,
        merk: "Honda",
        model: "Goldwing",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 120,
        beschikbaarheid: false,
        rating: 5,
        image: "honda1.png",
      },
      {
        id: 17,
        merk: "Honda",
        model: "CB500X",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: true,
        rating: 3,
        image: "honda1.png",
      },
      {
        id: 18,
        merk: "Honda",
        model: "Rebel 500",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: true,
        rating: 4,
        image: "honda1.png",
      },
      {
        // Yamaha
        id: 19,
        merk: "Yamaha",
        model: "YZF-R1M",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 150,
        beschikbaarheid: true,
        rating: 4,
        image: "Yamaha1.png",
      },
      {
        id: 20,
        merk: "Yamaha",
        model: "YZF-R6",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 130,
        beschikbaarheid: false,
        rating: 3,
        image: "Yamaha1.png",
      },
      {
        id: 21,
        merk: "Yamaha",
        model: "MT-09 SP",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 100,
        beschikbaarheid: true,
        rating: 5,
        image: "Yamaha1.png",
      },
      {
        id: 22,
        merk: "Yamaha",
        model: "MT-07",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: true,
        rating: 4,
        image: "Yamaha1.png",
      },
      {
        id: 23,
        merk: "Yamaha",
        model: "Tracer 700",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: true,
        rating: 4,
        image: "Yamaha1.png",
      },
      {
        id: 24,
        merk: "Yamaha",
        model: "XSR700",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 50,
        beschikbaarheid: true,
        rating: 4,
        image: "Yamaha1.png",
      },
      {
        // Kawasaki
        id: 25,
        merk: "Kawasaki",
        model: "Ninja H2R",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 150,
        beschikbaarheid: true,
        rating: 4,
        image: "kawa1.png",
      },
      {
        id: 26,
        merk: "Kawasaki",
        model: "Ninja 1000SX",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 130,
        beschikbaarheid: true,
        rating: 5,
        image: "kawa1.png",
      },
      {
        id: 27,
        merk: "Kawasaki",
        model: "Z900",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 100,
        beschikbaarheid: true,
        rating: 4,
        image: "kawa1.png",
      },
      {
        id: 28,
        merk: "Kawasaki",
        model: "Versys 1000 SE",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 120,
        beschikbaarheid: true,
        rating: 4,
        image: "kawa1.png",
      },
      {
        id: 29,
        merk: "Kawasaki",
        model: "Z650",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: false,
        rating: 3,
        image: "kawa1.png",
      },
      {
        id: 30,
        merk: "Kawasaki",
        model: "Ninja 650",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: true,
        rating: 4,
        image: "kawa1.png",
      },
      {
        // Harley Davidson
        id: 31,
        merk: "Harley Davidson",
        model: "Street Bob",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 150,
        beschikbaarheid: true,
        rating: 4,
        image: "HarleyD1.png",
      },
      {
        id: 32,
        merk: "Harley Davidson",
        model: "Fat Bob",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 130,
        beschikbaarheid: true,
        rating: 5,
        image: "HarleyD1.png",
      },
      {
        id: 33,
        merk: "Harley Davidson",
        model: "Road King",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 120,
        beschikbaarheid: true,
        rating: 4,
        image: "HarleyD1.png",
      },
      {
        id: 34,
        merk: "Harley Davidson",
        model: "Road Glide",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 120,
        beschikbaarheid: true,
        rating: 4,
        image: "HarleyD1.png",
      },
      {
        id: 35,
        merk: "Harley Davidson",
        model: "Ultra Limited",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 120,
        beschikbaarheid: true,
        rating: 4,
        image: "HarleyD1.png",
      },
      {
        id: 36,
        merk: "Harley Davidson",
        model: "CVO Limited",
        datum: new Date(2021, 4, 10, 10, 0),
        huurprijs_per_dag: 120,
        beschikbaarheid: true,
        rating: 5,
        image: "HarleyD1.png",
      },
    ]);
  },
};
