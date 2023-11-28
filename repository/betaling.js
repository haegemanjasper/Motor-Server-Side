const { tables, getKnex } = require('../src/data/index');
const { getLogger } = require('../src/core/logging');

const formatBetaling = ({
  huurlocatie_id,
  huurlocatie_naam,
  klant_id,
  klant_naam,
  ...betaling
}) => {
  return {
    ...betaling,
    klant: {
      id: klant_id,
      naam: klant_naam,
    },
    huurlocatie: {
      id: huurlocatie_id,
      naam: huurlocatie_naam,
    },
  };
};

const SELECT_COLUMNS = [
  `${tables.betaling}.id`,
  'bedrag',
  'betaalmethode',
  'datum',
  `${tables.huurlocatie}.id as huurlocatie_id`,
  `${tables.huurlocatie}.naam as huurlocatie_naam`,
  `${tables.klant}.id as klant_id`,
  `${tables.klant}.naam as klant_naam`,
];

const findAll = async () => {
  const betalingen = await getKnex()(tables.betaling)
  .join(
    tables.huurlocatie,
    `${tables.betaling}.huurlocatie_id`,
    '=',
    `${tables.huurlocatie}.id`
  )
  .join(
    tables.klant,
    `${tables.betaling}.klant_id`,
    '=',
    `${tables.klant}.id`
  )
  .select(SELECT_COLUMNS)
  .orderBy('datum', 'ASC');

return betalingen.map(formatBetaling);
};

const findCount = async () => {
  const [count] = await getKnex()(tables.betaling).count();
  return count['count(*)'];
};


const findById = async (id) => {
  const betaling = await getKnex()(tables.betaling)
    .join(
      tables.huurlocatie,
      `${tables.betaling}.huurlocatie_id`,
      '=',
      `${tables.huurlocatie}.id`
    )
    .join(
      tables.klant,
      `${tables.betaling}.klant_id`,
      '=',
      `${tables.klant}.id`
    )
    .where(`${tables.betaling}.id`, id)
    .first(SELECT_COLUMNS);

  return betaling && formatBetaling(betaling);
};

const create = async ({ bedrag, betaalmethode, datum, huurlocatieId, klantId }) => {
  try {
    const [id] = await getKnex()(tables.betaling).insert({
      bedrag,
      betaalmethode,
      datum,
      huurlocatie_id: huurlocatieId,
      klant_id: klantId,
    });
    return id;
  } catch (error) {
    getLogger().error('Error in create', {
      error,
    });
    throw error;
  }
};

const updateById = async (id, { bedrag, betaalmethode, datum, huurlocatieId, klantId }) => {
  try {
    await getKnex()(tables.betaling)
    .update({ 
      bedrag,
      betaalmethode,
      datum,
      huurlocatie_id: huurlocatieId,
      klant_id: klantId,
     }).where(`${tables.betaling}.id`, id);
    return id;
  } catch (error) {
    getLogger().error('Error in updateById', {
      error,
    });
    throw error;
  }
};

const deleteById = async (id, klantId) => {
  try {
    const rowsAffected = await getKnex()(tables.betaling)
      .where(`${tables.betaling}.id`, id)
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
  findAll,
  findCount,
  findById,
  deleteById,
  updateById,
  create,
};
