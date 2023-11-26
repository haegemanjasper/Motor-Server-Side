const { getLogger } = require('../src/core/logging');
const { tables, getKnex } = require('../src/data/index');

const formatMotor = ({
  klant,
  huurlocatie,
  ...motor
}) => {
  return {
    ...motor,
    klant: {
      id: klant.id,
      voornaam: klant.voornaam,
      achternaam: klant.achternaam,
    },
    huurlocatie: {
      id: huurlocatie.id,
      postcode: huurlocatie.postcode,
    },
  };
};

const SELECT_COLUMNS = [
  `${tables.motor}.motor_id as id`,
  `${tables.motor}.datum as date`,
  `${tables.motor}.beschikbaarheid as available`,
  `${tables.motor}.huurprijs_per_dag as price`,
  `${tables.motor}.merk as brand`,
  `${tables.motor}.model as model`,
  `${tables.motor}.rating as rating`,
  // 'image', 
  `${tables.klant}.id as klant.id`,
  `${tables.klant}.voornaam as klant.voornaam`,
  `${tables.klant}.achternaam as klant.achternaam`,
  `${tables.huurlocatie}.id as huurlocatie.id`,
  `${tables.huurlocatie}.postcode as huurlocatie.postcode`,
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
      `${tables.motor}.huurlocatie_id`
    )
    .where(`${tables.motor}.motor_id`, id)
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
      `${tables.motor}.huurlocatie_id`
    )
    .select(SELECT_COLUMNS)
    .orderBy('id', 'ASC');

  return motors.map(formatMotor);
}

// image toevoegen?
const create = async ({motor_id,datum,beschikbaarheid,huurprijs_per_dag,merk,model,rating,klant_id,huurlocatie_id}) => {
  try {
    const [id] = await getKnex()(tables.motor).insert({
    motor_id,
    datum,
    beschikbaarheid,
    huurprijs_per_dag,
    merk,
    model,
    rating,
    //image,
    klant_id,
    huurlocatie_id,
  });

  return id;
} catch (error) {
  getLogger().error('Error in create', {
    error,
});
  throw error;
}
};

// image toevoegen?
 const updateById = async (id, {motor_id,datum,beschikbaarheid,huurprijs_per_dag,merk,model,rating,klant_id,huurlocatie_id}) => {
   try {
    await getKnex()(tables.motor)
    .update({
      motor_id,
      datum,
      beschikbaarheid,
      huurprijs_per_dag,
      merk,
      model,
      rating,
      //image,
      klant_id,
      huurlocatie_id,
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

const deleteById = async (id) => {
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
