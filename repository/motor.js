const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  return getKnex()(tables.motor).select().orderBy('merk', 'ASC');
};

const findCount = async () => {
  const [count] = await getKnex()(tables.motor).count();
  return count['count(*)'];
};


const findById = (id) => {
  return getKnex()(tables.motor).where('id', id).first();
};

const create = async ({ merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating }) => {
  try {
    const [id] = await getKnex()(tables.motor).insert({
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

const updateById = async (id, { merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating }) => {
  try {
    await getKnex()(tables.motor)
      .update({
        merk,
        model,
        datum,
        huurprijs_per_dag,
        beschikbaarheid,
        rating,
      })
      .where('id', id);
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
    const rowsAffected = await getKnex()(tables.motor).delete().where('id', id);
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
