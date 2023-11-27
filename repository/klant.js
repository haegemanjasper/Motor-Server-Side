const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  getLogger().info('Finding all klanten');
  return getKnex()(tables.klant)
    .select()
    .orderBy('klantId', 'ASC');
};

const findCount = () => {
  return getKnex()(tables.klant)
    .count('id as count');
};


const findById = (klantId) => {
  getLogger().info(`Finding klant with id ${klantId}`);
  return getKnex()(tables.klant).where('klantId', klantId).first();
};

const create = async ({ klantId, naam, voornaam, straat, huisnummer, postcode, stad }) => {
  try {
    const [id] = await getKnex()(tables.klant).insert({
      klantId,
      naam,
      voornaam,
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

const updateById = async (id, { klantId, naam, voornaam, straat, huisnummer, postcode, stad }) => {
  try {
    await getKnex()(tables.klant).update({ klantId, naam, voornaam, straat, huisnummer, postcode, stad }).where('klantId', id);
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
    const rowsAffected = await getKnex()(tables.klant).delete().where('klantId', id);
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
