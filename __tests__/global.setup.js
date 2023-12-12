const config = require("config");
const { initializeLogger } = require("../src/core/logging");
const Role = require("../src/core/roles");
const { initializeData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });
  await initializeData();

  const knex = getKnex();

  await knex(tables.klant).insert([
    {
      id: 1,
      naam: "Test",
      voornaam: "Klant",
      email: "test.klant@hogent.be",
      straat: "Slijkwegel",
      huisnummer: "1",
      postcode: "9000",
      stad: "Gent",
      password_hash:
        "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU",
      roles: JSON.stringify([Role.KLANT]),
    },
    {
      id: 2,
      naam: "Admin",
      voornaam: "Klant",
      email: "admin.klant@hogent.be",
      straat: "Schoorsteenstraat",
      huisnummer: "10",
      postcode: "9300",
      stad: "Aalst",
      password_hash:
        "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU",
      roles: JSON.stringify([Role.ADMIN, Role.KLANT]),
    },
  ]);
};
