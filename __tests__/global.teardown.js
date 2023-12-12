const { shutdownData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  await getKnex()(tables.betaling).delete();
  await getKnex()(tables.klant).delete();
  await getKnex()(tables.huurlocatie).delete();
  await getKnex()(tables.motor).delete();

  await shutdownData();
};
