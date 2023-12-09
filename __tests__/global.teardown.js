const { shutdownData, getKnex, tables } = require("../src/data"); // 👈 2 en 3

// 👇 1
module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.betaling).delete(); // 👈 2
  await getKnex()(tables.klant).delete(); // 👈 2
  await getKnex()(tables.huurlocatie).delete(); // 👈 2

  // Close database connection
  await shutdownData(); // 👈 3
};
