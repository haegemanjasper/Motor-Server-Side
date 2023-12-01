const supertest = require("supertest");

const createServer = require("../src/createServer");
const { tables, getKnex } = require("../src/data");

const testData = {
  motoren: [
    {
      id: 1,
      merk: "BMW",
      model: "testmodel",
      datum: new Date(2023, 4, 10, 10, 0),
      huurprijs_per_dag: 125,
      beschikbaarheid: false,
      rating: 4,
      image: "bmw1.png",
    },

    {
      id: 2,
      merk: "Honda",
      model: "testmodel",
      datum: new Date(2023, 4, 10, 10, 0),
      huurprijs_per_dag: 75,
      beschikbaarheid: true,
      rating: 5,
      image: "honda1.png",
    },
    {
      id: 3,
      merk: "Yamaha",
      model: "testmodel",
      datum: new Date(2023, 4, 10, 10, 0),
      huurprijs_per_dag: 100,
      beschikbaarheid: true,
      rating: 5,
      image: "Yamaha1.png",
    },
  ],
};

const motorToDelete = [1, 2, 3];

describe("Motoren", () => {
  let server;
  let request;
  let knex;

  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback());
    knex = getKnex();
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = "/api/motoren";

  describe("GET /api/motoren", () => {
    beforeAll(async () => {
      await knex(tables.motor).insert(testData.motoren);
    });

    afterAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
    });

    it("should 200 and return all motoren", async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(3);

      expect(response.body.items[0]).toEqual({
        id: 1,
        merk: "BMW",
        model: "testmodel",
        datum: "2023-05-10T08:00:00.000Z",
        huurprijs_per_dag: "125.00",
        beschikbaarheid: 0,
        rating: 4,
        image: "bmw1.png",
      });
      expect(response.body.items[1]).toEqual({
        id: 2,
        merk: "Honda",
        model: "testmodel",
        datum: "2023-05-10T08:00:00.000Z",
        huurprijs_per_dag: "75.00",
        beschikbaarheid: 1,
        rating: 5,
        image: "honda1.png",
      });
    });
  });

  describe("POST /api/motoren", () => {
    beforeAll(async () => {
      await knex(tables.motor).insert(testData.motoren);
    });

    afterAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
    });

    it("should 201 and return the created motor", async () => {
      const response = await request.post(url).send({
        merk: "Honda",
        model: "testmodel",
        datum: new Date(2023, 4, 10, 10, 0),
        huurprijs_per_dag: 75,
        beschikbaarheid: true,
        rating: 5,
        image: "honda1.png",
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.merk).toBe("Honda");
      expect(response.body.model).toBe("testmodel");
      expect(response.body.datum).toEqual("2023-05-10T08:00:00.000Z");
      expect(response.body.huurprijs_per_dag).toBe("75.00");
      expect(response.body.beschikbaarheid).toBe(1);
      expect(response.body.rating).toBe(5);
      expect(response.body.image).toBe("honda1.png");

      motorToDelete.push(response.body.id);
    });
  });

  describe("PUT /api/motoren/:id", () => {
    beforeAll(async () => {
      await knex(tables.motor).insert(testData.motoren);
    });

    afterAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
    });

    it("should 200 and update the specified motor", async () => {
      const motorIdToUpdate = testData.motoren[0].id;

      const response = await request.put(`${url}/${motorIdToUpdate}`).send({
        merk: "BMW",
        model: "testmodel",
        datum: new Date(2023, 4, 10, 10, 0),
        huurprijs_per_dag: 125,
        beschikbaarheid: false,
        rating: 4,
        image: "bmw1.png",
      });

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(motorIdToUpdate);
      expect(response.body.merk).toBe("BMW");
      expect(response.body.model).toBe("testmodel");
      expect(response.body.datum).toEqual("2023-05-10T08:00:00.000Z");
      expect(response.body.huurprijs_per_dag).toBe("125.00");
      expect(response.body.beschikbaarheid).toBe(0);
      expect(response.body.rating).toBe(4);
      expect(response.body.image).toBe("bmw1.png");
    });
  });

  describe("DELETE /api/motoren/:id", () => {
    beforeAll(async () => {
      await knex(tables.motor).insert(testData.motoren);
    });

    afterAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
    });

    it("should 204 and delete the specified motor", async () => {
      const motorIdToDelete = testData.motoren[0].id;

      const response = await request.delete(`${url}/${motorIdToDelete}`);

      expect(response.status).toBe(204);

      const deletedMotor = await knex(tables.motor)
        .where("id", motorIdToDelete)
        .first();
      expect(deletedMotor).toBeUndefined();

      const index = motorToDelete.indexOf(motorIdToDelete);
      if (index !== -1) {
        motorToDelete.splice(index, 1);
      }
    });
  });
});
