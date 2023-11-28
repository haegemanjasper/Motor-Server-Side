const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  return getKnex()(tables.klant).select().orderBy('naam', 'ASC');
};

const findCount = async () => {
  const [count] = await getKnex()(tables.klant).count();
  return count['count(*)'];
};

const findById = (id) => {
  return getKnex()(tables.klant).where('id', id).first();
};

const findByEmail = (email) => {
  return getKnex()(tables.klant).where('email', email).first();
};

const create = async ({ naam, voornaam, email, straat, huisnummer, postcode, stad }) => {
  try {
    const [id] = await getKnex()(tables.klant).insert({
      naam,
      voornaam,
      email,
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

const updateById = async (id, { naam, voornaam, email, straat, huisnummer, postcode, stad }) => {
  try {
    await getKnex()(tables.klant)
    .update({
       naam,
       voornaam,
       email,
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
    const rowsAffected = await getKnex()(tables.klant).delete().where('id', id);
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
