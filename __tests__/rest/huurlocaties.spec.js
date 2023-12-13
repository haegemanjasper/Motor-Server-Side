const { tables } = require("../../src/data");
const { withServer, login } = require("../supertest.setup");
const { testAuthHeader } = require("../common/auth");

const data = {
  huurlocaties: [
    {
      id: 1,
      naam: "testmotorlocatie1",
      straat: "teststraat",
      huisnummer: 31,
      postcode: 9000,
      stad: "Gent",
    },
    {
      id: 2,
      naam: "testmotorlocatie2",
      straat: "teststraat",
      huisnummer: 31,
      postcode: 9000,
      stad: "Gent",
    },
    {
      id: 3,
      naam: "testmotorlocatie3",
      straat: "teststraat",
      huisnummer: 31,
      postcode: 9000,
      stad: "Gent",
    },
  ],
};

const huurlocatiesToDelete = {
  huurlocaties: [1, 2, 3],
};

describe("Huurlocaties", () => {
  let request, knex, authHeader;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    authHeader = await login(request);
  });

  const url = "/api/huurlocaties";

  describe("GET /api/huurlocaties", () => {
    beforeAll(async () => {
      await knex(tables.huurlocatie).insert(data.huurlocaties);
    });

    afterAll(async () => {
      await knex(tables.huurlocatie)
        .whereIn("id", huurlocatiesToDelete.huurlocaties)
        .delete();
    });

    it("should 200 and return all places", async () => {
      const response = await request.get(url).set("Authorization", authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(3);

      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 2,
            naam: "testmotorlocatie2",
            straat: "teststraat",
            huisnummer: 31,
            postcode: 9000,
            stad: "Gent",
          },
          {
            id: 3,
            naam: "testmotorlocatie3",
            straat: "teststraat",
            huisnummer: 31,
            postcode: 9000,
            stad: "Gent",
          },
        ])
      );
    });

    it("should 400 when given an argument", async () => {
      const response = await request
        .get(`${url}?invalid=true`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.query).toHaveProperty("invalid");
    });

    testAuthHeader(() => request.get(url));
  });

  describe("GET /api/huurlocaties/:id", () => {
    beforeAll(async () => {
      await knex(tables.huurlocatie).insert(data.huurlocaties[0]);
    });

    afterAll(async () => {
      await knex(tables.huurlocatie)
        .whereIn("id", huurlocatiesToDelete.huurlocaties)
        .delete();
    });

    it("should 200 and return the requested place", async () => {
      const response = await request
        .get(`${url}/1`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        naam: "testmotorlocatie1",
        straat: "teststraat",
        huisnummer: 31,
        postcode: 9000,
        stad: "Gent",
      });
    });

    it("should 404 when requesting not existing place", async () => {
      const response = await request
        .get(`${url}/2`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: "NOT_FOUND",
        message: "No huurlocatie with id 2 exists",
        details: {
          id: 2,
        },
      });
      expect(response.body.stack).toBeTruthy();
    });

    it("should 400 with invalid huurlocatie id", async () => {
      const response = await request
        .get(`${url}/invalid`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.params).toHaveProperty("id");
    });

    testAuthHeader(() => request.get(`${url}/1`));
  });

  describe("POST /api/huurlocaties", () => {
    const huurlocatiesToDelete = [];

    afterAll(async () => {
      await knex(tables.huurlocatie)
        .whereIn("id", huurlocatiesToDelete)
        .delete();
    });

    it("should 201 and return the created place", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send({
          naam: "nieuwe locatie",
          straat: "teststraat",
          huisnummer: 31,
          postcode: 9000,
          stad: "Gent",
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.naam).toBe("nieuwe locatie");
      expect(response.body.straat).toBe("teststraat");
      expect(response.body.huisnummer).toBe(31);
      expect(response.body.postcode).toBe(9000);
      expect(response.body.stad).toBe("Gent");

      huurlocatiesToDelete.push(response.body.id);
    });

    it("should 400 when missing name", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send({
          straat: "teststraat",
          huisnummer: 31,
          postcode: 9000,
          stad: "Gent",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.body).toHaveProperty("naam");
    });
    testAuthHeader(() => request.post(url));
  });

  describe("PUT /api/huurlocaties/:id", () => {
    beforeAll(async () => {
      await knex(tables.huurlocatie).insert(data.huurlocaties);
    });

    afterAll(async () => {
      await knex(tables.huurlocatie)
        .whereIn("id", huurlocatiesToDelete.huurlocaties)
        .delete();
    });

    it("should 200 and return the updated place", async () => {
      const response = await request
        .put(`${url}/1`)
        .set("Authorization", authHeader)
        .send({
          naam: "aangepaste locatie",
          straat: "teststraat",
          huisnummer: 31,
          postcode: 9000,
          stad: "Gent",
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        naam: "aangepaste locatie",
        straat: "teststraat",
        huisnummer: 31,
        postcode: 9000,
        stad: "Gent",
      });
    });

    it("should 400 for duplicate place name", async () => {
      const response = await request
        .put(`${url}/2`)
        .set("Authorization", authHeader)
        .send({
          naam: "aangepaste locatie",
          straat: "teststraat",
          huisnummer: 31,
          postcode: 9000,
          stad: "Gent",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        code: "VALIDATION_FAILED",
        message: "A huurlocatie with this name already exists",
        details: {},
      });
      expect(response.body.stack).toBeTruthy();
    });

    it("should 400 when missing name", async () => {
      const response = await request
        .put(`${url}/1`)
        .set("Authorization", authHeader)
        .send({
          straat: "teststraat",
          huisnummer: 31,
          postcode: 9000,
          stad: "Gent",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.body).toHaveProperty("naam");
    });
    testAuthHeader(() => request.put(`${url}/1`));
  });

  describe("DELETE /api/huurlocaties/:id", () => {
    beforeAll(async () => {
      await knex(tables.huurlocatie).insert(data.huurlocaties[0]);
    });

    it("should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/1`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it("should 404 with not existing huurlocatie", async () => {
      const response = await request
        .delete(`${url}/1`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: "NOT_FOUND",
        message: "No huurlocatie with id 1 exists",
        details: {
          id: 1,
        },
      });
      expect(response.body.stack).toBeTruthy();
    });

    it("should 400 with invalid huurlocatie id", async () => {
      const response = await request
        .get(`${url}/invalid`)
        .set("Authorization", authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.params).toHaveProperty("id");
    });

    testAuthHeader(() => request.delete(`${url}/1`));
  });
});
