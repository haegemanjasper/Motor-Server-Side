const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  getLogger().info('Finding all huurlocaties');
  return getKnex()(tables.huurlocatie)
    .select()
    .orderBy('id', 'ASC');
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

const findById = (id) => {
  getLogger().info(`Finding huurlocatie with id ${id}`);
  return getKnex()(tables.huurlocatie).where('id', id).first();
};

const create = async ({ huurlocatie_id, naam, straat, huisnummer, postcode }) => {
  try {
    const [id] = await getKnex()(tables.huurlocatie).insert({
      huurlocatie_id,
      naam,
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

const updateById = async (id, { huurlocatie_id, naam, straat, huisnummer, postcode }) => {
  try {
    await getKnex()(tables.huurlocatie).update({ huurlocatie_id, naam, straat, huisnummer, postcode }).where('huurlocatie_id', id);
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
    const rowsAffected = await getKnex()(tables.huurlocatie).delete().where('huurlocatie_id', id);
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
