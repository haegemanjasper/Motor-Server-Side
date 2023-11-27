const ServiceError = require('../core/serviceError'); 
const handleDBError = require('./_handleDBError'); 
const betalingRepository = require('../../repository/betaling');

const getAll = async () => {
  const items = await betalingRepository.findAll();
  return {
    items,
    count: items.length,
  };
};

const getById = async (id) => {
  const betaling = await betalingRepository.findById(id);

  if (!betaling) {
    throw ServiceError.notFound(`Geen betaling gevonden met id: ${id}`);
  }
  return betaling;
};

const create = async (betaling) => {
  const id = await betalingRepository.create(betaling);
  return getById(id);
};

const updateById = async (id, betaling) => {
  try {
    const existingBetaling = await betalingRepository.update(id, betaling);

    if (!existingBetaling) {
      throw ServiceError.notFound(`No betaling with id ${id} exists`, { id });
    }

    return getById(id);
  } catch (error) {
    throw handleDBError(error);
  }
};
  

const deleteById = async (id) => {
  try {
    const deleted = await betalingRepository.deleteById(id);

    if (!deleted) {
      throw ServiceError.notFound(`No betaling with id ${id} exists`, { id });
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