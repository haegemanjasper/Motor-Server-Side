const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const findAll = () => {
  getLogger().info('Finding all betalingen');
  return getKnex()(tables.betaling)
    .select()
    .orderBy('betalingId', 'ASC');
};

const findCount = () => {
  return getKnex()(tables.betaling)
    .count('id as count');
};


const findById = (betalingId) => {
  getLogger().info(`Finding betaling with id ${id}`);
  return getKnex()(tables.betaling).where('betalingId', betalingId).first();
};

const create = async ({ betalingId, klantId, huurlocatieId, bedrag, betaalmethode, datum }) => {
  try {
    const [id] = await getKnex()(tables.betaling).insert({
      betalingId,
      klantId,
      huurlocatieId,
      bedrag,
      betaalmethode,
      datum,
    });
    return id;
  } catch (error) {
    getLogger().error('Error in create', {
      error,
    });
    throw error;
  }
};

const updateById = async (id, { betalingId, klantId, huurlocatieId, bedrag, betaalmethode, datum }) => {
  try {
    await getKnex()(tables.betaling).update({ betalingId, klantId, huurlocatieId, bedrag, betaalmethode, datum }).where('betalingId', id);
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
    const rowsAffected = await getKnex()(tables.betaling).delete().where('betalingId', id);
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
