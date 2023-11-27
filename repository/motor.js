const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  getLogger().info('Finding all motors');
  return getKnex()(tables.motor)
    .select()
    .orderBy('motorId', 'ASC');
};

const findCount = () => {
  return getKnex()(tables.motor)
    .count('id as count');
};


const findById = (motorId) => {
  getLogger().info(`Finding motor with id ${motorId}`);
  return getKnex()(tables.motor).where('motorId', motorId).first();
};

const create = async ({ motorId, merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating }) => {
  try {
    const [id] = await getKnex()(tables.motor).insert({
      motorId,
      merk,
      model,
      datum,
      huurprijs_per_dag,
      beschikbaarheid,
      rating,

    });
    return id;
  } catch (error) {
    getLogger().error('Error in create', {
      error,
    });
    throw error;
  }
};

const updateById = async (id, { motorId, merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating }) => {
  try {
    await getKnex()(tables.motor).update({ motorId, merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating }).where('motorId', id);
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
    const rowsAffected = await getKnex()(tables.motor).delete().where('motorId', id);
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
  findById,
  deleteById,
  updateById,
  create,
};
