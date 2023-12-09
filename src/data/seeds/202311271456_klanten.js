const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
  seed: async (knex) => {
    await knex(tables.klant).delete();

    await knex(tables.klant).insert([
      {
        id: 1,
        naam: "Haegeman",
        voornaam: "Jasper",
        email: "jasper.haegeman@student.hogent.be",
        straat: "Sluipweg",
        huisnummer: 31,
        postcode: 9300,
        stad: "Aalst",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.ADMIN, Role.KLANT]),
      },

      {
        id: 2,
        naam: "De Smet",
        voornaam: "Jef",
        email: "jef.ds@hotmail.com",
        straat: "Kortrijksesteenweg",
        huisnummer: 11,
        postcode: 9200,
        stad: "Dendermonde",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
      },

      {
        id: 3,
        naam: "De Vos",
        voornaam: "Johan",
        email: "johan.dv@hotmail.com",
        straat: "Kouter",
        huisnummer: 1,
        postcode: 9300,
        stad: "Aalst",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
      },
    ]);
  },
};
