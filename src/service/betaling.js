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

const create = async ({ betaling_id, betalingsmethode, betaalstatus, bedrag}) => {
  const existingBetaling = await betalingRepository.getById(betaling_id);

  if (existingBetaling) {
    throw new ServiceError(`Een betaling met id ${betaling_id} bestaat al.`);
  }
  try {
    const id = await betalingRepository.create({
      betaling_id,
      betalingsmethode,
      betaalstatus,
      bedrag,
    });
    return getById(id);
  } catch (error) {
    handleDBError(error);
    }
  };

  const updateById = async (id, { betaling_id, betalingsmethode, betaalstatus, bedrag }) => {
    const existingBetaling = await betalingRepository.getById(id);
  
    if (!existingBetaling) {
      throw ServiceError.notFound(`Geen betaling gevonden met id: ${id}`);
    }
  
    await betalingRepository.updateById(id, {
      betaling_id,
      betalingsmethode,
      betaalstatus,
      bedrag,
    });
  
    return getById(id);
  };
  

const deleteById = async (id) => {
  const deletedBetaling = await betalingRepository.deleteById(id);
  
  if (!deletedBetaling) {
    throw ServiceError.notFound(`Geen betaling gevonden met id: ${id}`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};