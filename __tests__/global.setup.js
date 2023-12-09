const config = require("config");
const { initializeLogger } = require("../src/core/logging");
const Role = require("../src/core/roles");
const { initializeData, getKnex, tables } = require("../src/data");

// 👇 1
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
      name: "Test Klant",
      email: "test.klant@hogent.be",
      password_hash:
        "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU",
      roles: JSON.stringify([Role.KLANT]),
    },
    {
      id: 2,
      name: "Admin Klant",
      email: "admin.klant@hogent.be",
      password_hash:
        "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU",
      roles: JSON.stringify([Role.ADMIN, Role.KLANT]),
    },
  ]);
};
