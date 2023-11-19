const { tables, getKnex} = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  getLogger().info('Finding all huurlocaties');
  return getKnex()(tables.huurlocatie)
  .select()
  .orderBy('name', 'ASC');
};

const findCount = () => {
  return getKnex()(tables.huurlocatie)
  .count('id as count');
};

const findByName = (name) => {
  return getKnex()(tables.huurlocatie)
  .where('name', name)
  .first();
};

const findById = (id) => {
  getLogger().info(`Finding huurlocatie with id ${id}`);
  return getKnex()(tables.huurlocatie).where('id', id).first();
};

const create = async ({ straat, nummer, postcode }) => {
 try {
  const [id] = await getKnex()(tables.huurlocatie).insert({
    straat,
    nummer,
    postcode,
  });
  return id;
} catch (error){
  getLogger().error('Error in create', {
    error
  });
  throw error;
 }
};

const updateById = async (id, { straat, nummer, postcode }) => {
  try {
    await getKnew()(tables.huurlocatie).update({ straat, nummer, postcode }).where('id', id);

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
    } catch {
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