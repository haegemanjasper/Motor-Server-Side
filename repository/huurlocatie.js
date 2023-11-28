const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  getLogger().info('Finding all huurlocaties');
  return getKnex()(tables.huurlocatie).select().orderBy('naam', 'ASC');
};

const findByName = (naam) => {
  return getKnex()(tables.huurlocatie).where('naam', naam).first();
};

const findById = (id) => {
  getLogger().info('Querying huurlocatie by id', { id });
  return getKnex()(tables.huurlocatie).where('id', id).first();
};

const create = async ({ naam, straat, huisnummer, postcode, stad }) => {
  try {
    const [id] = await getKnex()(tables.huurlocatie).insert({
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

const updateById = async (id, {  naam, straat, huisnummer, postcode, stad }) => {
  try {
    await getKnex()(tables.huurlocatie)
    .update({  
      naam,
      straat,
      huisnummer,
      postcode,
      stad 
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
    const rowsAffected = await getKnex()(tables.huurlocatie).delete().where('id', id);

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
  findByName,
  findById,
  deleteById,
  updateById,
  create,
};
