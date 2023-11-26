const { getLogger } = require('../src/core/logging');
const { tables, getKnex } = require('../src/data/index');

const SELECT_COLUMNS = [
  `${tables.klant}.klant_id as id`,
  `${tables.klant}.voornaam`,
  `${tables.klant}.achternaam`,
  `${tables.klant}.straat`,
  `${tables.klant}.huisnummer`,
  `${tables.klant}.postcode`,
];

const formatKlant = (klant) => {
  return {
    id: klant.id,
    voornaam: klant.voornaam,
    achternaam: klant.achternaam,
    straat: klant.straat,
    huisnummer: klant.huisnummer,
    postcode: klant.postcode,
  };
};

const findById = async (id) => {
  const klant = await getKnex()(tables.klant)
    .where(`${tables.klant}.klant_id`, id)
    .first(SELECT_COLUMNS);

  return klant && formatKlant(klant);
};

const findCount = async () => {
  const count = await getKnex()(tables.klant)
    .count('klant_id as count')
    .first();
  return count && count.count;
};

const findAll = async () => {
  const klanten = await getKnex()(tables.klant)
    .select(SELECT_COLUMNS)
    .orderBy('id', 'ASC');

  return klanten.map(formatKlant);
};

const create = async ({ klant_id, voornaam, achternaam, straat, huisnummer, postcode }) => {
  try {
    const [id] = await getKnex()(tables.klant).insert({
      klant_id,
      voornaam,
      achternaam,
      straat,
      huisnummer,
      postcode,
    });

    return id;
  } catch (error) {
    getLogger().error('Error in create', {
      error,
    });
    throw error;
  }
};

const updateById = async (id, { voornaam, achternaam, straat, huisnummer, postcode }) => {
  try {
    await getKnex()(tables.klant)
      .update({ voornaam, achternaam, straat, huisnummer, postcode })
      .where(`${tables.klant}.klant_id`, id);

    return id;
  } catch (error) {
    getLogger().error('Error in updateById', {
      error,
    });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.klant)
      .where(`${tables.klant}.klant_id`, id)
      .delete();

    return rowsAffected > 0;
  } catch (error) {
    getLogger().error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findById,
  findAll,
  findCount,
  create,
  updateById,
  deleteById,
};
