const ServiceError = require('../core/serviceError'); 
const handleDBError = require('./_handleDBError'); 
const betalingRepository = require('../../repository/betaling');
const huurlocatieService = require('./huurlocatie');

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
    throw ServiceError.notFound(`No betaling with id ${id} exists`, { id });
  }
  return betaling;
};

const create = async ( { bedrag, betaalmethode, datum, huurlocatieId, klantId }) => {
  const existingHuurlocatie = await huurlocatieService.getById(huurlocatieId);
  
  if (!existingHuurlocatie) {
    throw ServiceError.notFound(`There is no huurlocatie with id ${id}.`, { id });
};

  const id = await betalingRepository.create({
    bedrag,
    betaalmethode,
    datum,
    huurlocatieId,
    klantId,
  });
  return getById(id);
};

const updateById = async (id, { bedrag, betaalmethode, datum, huurlocatieId, klantId }) => {
  try {
    const existingHuurlocatie = await huurlocatieService.getById(huurlocatieId);

    if (!existingHuurlocatie) {
      throw ServiceError.notFound(`There is no huurlocatie with id ${id}.`, { id });
    }

    await betalingRepository.updateById(id, {
      bedrag,
      betaalmethode,
      datum,
      huurlocatieId,
      klantId,
    });

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