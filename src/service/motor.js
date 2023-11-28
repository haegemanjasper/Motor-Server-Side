const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBError');
const motorRepository = require('../../repository/motor');

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
const create = async ({ merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating }) => {
  const id = await motorRepository.create({ merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating });
  return getById(id);
  }

//image toevoegen?
const updateById = async (id, { merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating }) => {
  try {
    const existingMotor = await motorRepository.updateById(id, { merk, model, datum, huurprijs_per_dag, beschikbaarheid, rating });

    if (!existingMotor) {
      throw ServiceError.notFound(`No motor with id ${id} exists`, { id });
    }

    return getById(id);
  } catch (error) {
    throw handleDBError(error);
  }
};

const deleteById = async (id) => {
  const deleted = await motorRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`No motor with id ${id} exists`, { id });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
