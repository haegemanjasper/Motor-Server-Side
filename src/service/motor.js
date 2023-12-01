const ServiceError = require("../core/serviceError");
const handleDBError = require("./_handleDBError");
const motorRepository = require("../repository/motor");

const getAll = async () => {
  const items = await motorRepository.findAll();
  return {
    items,
    count: items.length,
  };
};

const getById = async (id) => {
  const motor = await motorRepository.findById(id);

  if (!motor) {
    throw ServiceError.notFound(`No motor with id ${id} exists`, { id });
  }

  return motor;
};

//image toevoegen?
const create = async ({
  merk,
  model,
  datum,
  huurprijs_per_dag,
  beschikbaarheid,
  rating,
  image,
}) => {
  const id = await motorRepository.create({
    merk,
    model,
    datum,
    huurprijs_per_dag,
    beschikbaarheid,
    rating,
    image,
  });
  return getById(id);
};

//image toevoegen?
const updateById = async (
  id,
  { merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating, image }
) => {
  try {
    const existingMotor = await motorRepository.updateById(id, {
      merk,
      model,
      datum,
      huurprijs_per_dag,
      beschikbaarheid,
      rating,
      image,
    });

    if (!existingMotor) {
      throw ServiceError.notFound(`No motor with id ${id} exists`, { id });
    }

    return getById(id);
  } catch (error) {
    throw handleDBError(error);
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await motorRepository.deleteById(id);

    if (!deleted) {
      throw ServiceError.notFound(`No motor with id ${id} exists`, { id });
    }
  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
