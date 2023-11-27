const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  getLogger().info('Finding all huurlocaties');
  return getKnex()(tables.huurlocatie)
    .select()
    .orderBy('huurlocatieId', 'ASC');
};

const findCount = () => {
  return getKnex()(tables.huurlocatie)
    .count('id as count');
};

const findByName = (naam) => {
  return getKnex()(tables.huurlocatie)
    .where('naam', naam)
    .first();
};

const findById = (huurlocatieId) => {
  getLogger().info(`Finding huurlocatie with id ${huurlocatieId}`);
  return getKnex()(tables.huurlocatie).where('huurlocatieId', huurlocatieId).first();
};

const create = async ({ huurlocatieId, naam, straat, huisnummer, postcode, stad }) => {
  try {
    const [id] = await getKnex()(tables.huurlocatie).insert({
      huurlocatieId,
      naam,
      straat,
      huisnummer,
      postcode,
      stad,
    });
    return id;
  } catch (error) {
    getLogger().error('Error in create', {
      error,
    });
    throw error;
  }
};

const updateById = async (id, { huurlocatieId, naam, straat, huisnummer, postcode, stad }) => {
  try {
    await getKnex()(tables.huurlocatie).update({ huurlocatieId, naam, straat, huisnummer, postcode, stad }).where('huurlocatieId', id);
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
    const rowsAffected = await getKnex()(tables.huurlocatie).delete().where('huurlocatieId', id);
    return rowsAffected > 0;
  } catch (error) {
    getLogger().error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findAll,
  findCount,
  findByName,
  findById,
  deleteById,
  updateById,
  create,
};
