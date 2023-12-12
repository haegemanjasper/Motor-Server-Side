const supertest = require("supertest");
const createServer = require("../src/createServer");
const { getKnex } = require("../src/data");

const login = async (supertest) => {
  const response = await supertest.post("/api/klanten/login").send({
    email: "test.klant@hogent.be",
    password: "12345678",
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }

  return `Bearer ${response.body.token}`;
};

const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      knex: getKnex(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    await server.stop();
  });
};

const loginAdmin = async (supertest) => {
  const response = await supertest.post("/api/klanten/login").send({
    email: "admin.klant@hogent.be",
    password: "12345678",
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }

  return `Bearer ${response.body.token}`;
};

module.exports = {
  login,
  loginAdmin,
  withServer,
};
