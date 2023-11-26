const { getLogger } = require('../src/core/logging');
const { tables, getKnex } = require('../src/data/index');

const formatBetaling = (betaling) => {
  return {
    id: betaling.betaling_id,
    betalingsmethode: betaling.betalingsmethode,
    betaalstatus: betaling.betaalstatus,
    bedrag: betaling.bedrag,
  };
};

const SELECT_COLUMNS = [
  `${tables.betaling}.betaling_id as id`,
  `${tables.betaling}.betalingsmethode`,
  `${tables.betaling}.betaalstatus`,
  `${tables.betaling}.bedrag`,
];

const findById = async (id) => {
  const betaling = await getKnex()(tables.betaling)
    .where(`${tables.betaling}.betaling_id`, id)
    .first(SELECT_COLUMNS);

  return betaling && formatBetaling(betaling);
};

const findCount = async () => {
  const count = await getKnex()(tables.betaling)
    .count('betaling_id as count')
    .first();
  return count && count.count;
};

const findAll = async () => {
  const betalingen = await getKnex()(tables.betaling)
    .select(SELECT_COLUMNS)
    .orderBy('id', 'ASC');

  return betalingen.map(formatBetaling);
};

const create = async ({ betaling_id, betalingsmethode, betaalstatus, bedrag }) => {
  try {
    const [id] = await getKnex()(tables.betaling).insert({
      betaling_id,
      betalingsmethode,
      betaalstatus,
      bedrag,
    });

    return id;
  } catch (error) {
    getLogger().error('Error in create', {
      error,
    });
    throw error;
  }
};

const updateById = async (id, { betaling_id, betalingsmethode, betaalstatus, bedrag }) => {
  try {
    await getKnex()(tables.betaling)
      .update({ betaling_id, betalingsmethode, betaalstatus, bedrag })
      .where(`${tables.betaling}.betaling_id`, id);

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
    const rowsAffected = await getKnex()(tables.betaling)
      .where(`${tables.betaling}.betaling_id`, id)
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
