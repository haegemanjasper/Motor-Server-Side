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
    throw ServiceError.notFound (`Geen motor gevonden met id: ${id}`);
  }

  return motor;
};

//image toevoegen?
const create = async (motor) => {
  const id = await motorRepository.create(motor);
  return getById(id);
  }

//image toevoegen?
const updateById = async (id, motor) => {
  try {
    const updated = await motorRepository.update(id, motor);

    if (!updated) {
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
    throw ServiceError.notFound(`Geen motor gevonden met id: ${id}`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
