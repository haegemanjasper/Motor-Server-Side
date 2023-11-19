const { getLogger } = require('../src/core/logging');
const { tables, getKnex } = require('../src/data/index');

const formatMotor = ({
  klant,
  huur_locatie,
  ...motor
}) => {
  return {
    ...motor,
  klant: {
    id: klant.id,
    name: klant.name,
  },
  huur_locatie: {
    id: huur_locatie.id,
    name: huur_locatie.name,
  },
};
};

const SELECT_COLUMNS = [
  `${tables.motor}.motor_id as id`,
  'merk as name',
  'huurprijs_per_dag as price',
  'jaar as date',
  'beschikbaarheid as available',
  `${tables.motor}.rating as rating`,
  'image',
  `${tables.klant}.id as klant.id`,
  `${tables.klant}.name as klant.name`,
  `${tables.huurlocatie}.id as huur_locatie.id`,
  `${tables.huurlocatie}.name as huur_locatie.name`,
];

const findById = async (id) => {
  const motor = await getKnex()(tables.motor)
    .join(
      tables.klant,
      `${tables.klant}.id`,
      '=',
      `${tables.motor}.klant_id`
    )
    .join(
      tables.huurlocatie,
      `${tables.huurlocatie}.id`,
      '=',
      `${tables.motor}.huur_locatie_id`
    )
    .where(`${tables.motor}.motor.id`, id)
    .first(SELECT_COLUMNS);

  return motor && formatMotor(motor);
};

const findCount = async () => {
  const count = await getKnex()(tables.motor)
    .count('motor_id as count')
    .first();
  return count && count.count;
};

const findAll = async () => {
  const motors = await getKnex()(tables.motor)
    .join(
      tables.klant,
      `${tables.klant}.id`,
      '=',
      `${tables.motor}.klant_id`
    )
    .join(
      tables.huurlocatie,
      `${tables.huurlocatie}.id`,
      '=',
      `${tables.motor}.huur_locatie_id`
    )
    .select(SELECT_COLUMNS)
    .orderBy('id', 'ASC');

  return motors.map(formatMotor);
}

const create = async ({merk,huurprijs_per_dag,jaar,beschikbaarheid,rating,image,klant_id,huur_locatie_id}) => {
  try {
    const [id] = await getKnex()(tables.motor).insert({
    merk,
    huurprijs_per_dag,
    jaar,
    beschikbaarheid,
    rating,
    image,
    klant_id,
    huur_locatie_id,
  });

  return id;
} catch (error) {
  getLogger().error('Error in create', {
    error,
});
  throw error;
}
};
 const updateById = async (id, {merk,huurprijs_per_dag,jaar,beschikbaarheid,rating,image,klant_id,huur_locatie_id}) => {
   try {
    await getKnex()(tables.motor)
    .update({
      merk,
      huurprijs_per_dag,
      jaar,
      beschikbaarheid,
      rating,
      image,
      klant_id,
      huur_locatie_id,
    })
    .where(`${tables.motor}.motor_id`, id);
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
    const rowsAffected = await getKnex()(tables.motor)
    .where(`${tables.motor}.motor_id`, id)
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
