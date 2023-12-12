const { tables } = require("../../src/data");
const { withServer, login } = require("../supertest.setup");
const { testAuthHeader } = require("../common/auth");

const data = {
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
  let request, knex, authHeader;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    authHeader = await login(request);
  });

  const url = "/api/motoren";

  describe("GET /api/motoren", () => {
    beforeAll(async () => {
      await knex(tables.motor).insert(data.motoren);
    });

    afterAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
    });

    it("should 200 and return all motoren", async () => {
      const response = await request.get(url).set("Authorization", authHeader);
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
    testAuthHeader(() => request.get(url));
  });

  describe("POST /api/motoren", () => {
    const motorToDelete = [];

    beforeAll(async () => {
      await knex(tables.motor).insert(data.motoren);
    });

    afterAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
    });

    it("should 201 and return the created motor", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send({
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
    testAuthHeader(() => request.post(url));
  });

  describe("PUT /api/motoren/:id", () => {
    beforeAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
      await knex(tables.motor).insert(data.motoren);
    });

    afterAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
    });

    it("should 200 and update the specified motor", async () => {
      const response = await request
        .put(`${url}/1`)
        .set("Authorization", authHeader)
        .send({
          merk: "BMW",
          model: "testmodel",
          datum: new Date(2023, 4, 10, 10, 0),
          huurprijs_per_dag: 150,
          beschikbaarheid: false,
          rating: 4,
          image: "bmw1.png",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        merk: "BMW",
        model: "testmodel",
        datum: "2023-05-10T08:00:00.000Z",
        huurprijs_per_dag: "150.00",
        beschikbaarheid: 0,
        rating: 4,
        image: "bmw1.png",
      });
    });

    testAuthHeader(() => request.put(`${url}/1`));
  });

  describe("DELETE /api/motoren/:id", () => {
    beforeAll(async () => {
      await knex(tables.motor).insert(data.motoren[0]);
    });

    afterAll(async () => {
      await knex(tables.motor).whereIn("id", motorToDelete).delete();
    });

    it("should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/1`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it("should 404 with not existing motor", async () => {
      const response = await request
        .delete(`${url}/99`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: "NOT_FOUND",
        message: "No motor with id 99 exists",
        details: {
          id: 99,
        },
      });
      expect(response.body.stack).toBeTruthy();
    });

    it("should 400 with invalid motor id", async () => {
      const response = await request
        .delete(`${url}/invalid`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.params).toHaveProperty("id");
    });
    testAuthHeader(() => request.delete(`${url}/99`));
  });
});
