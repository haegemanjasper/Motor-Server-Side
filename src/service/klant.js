const ServiceError = require('../core/serviceError'); 
const handleDBError = require('./_handleDBError'); 
const klantRepository = require('../../repository/klant');

const getAll = async () => {
  const items = await klantRepository.findAll();
  return {
    items,
    count: items.length,
  };
};

const getById = async (id) => {
  const klant = await klantRepository.findById(id);
  if (!klant) {
    throw ServiceError.notFound(`Geen klant gevonden met id: ${id}`);
  }
  return klant;
};

const create = async (klant) => {
  const id = await klantRepository.create(klant);
  return getById(id);
};

  const updateById = async (id, klant) => {
    try {
      const existingKlant = await klantRepository.update(id, klant);
  
      if (!existingKlant) {
        throw ServiceError.notFound(`No klant with id ${id} exists`, { id });
      }
  
      return getById(id);
    } catch (error) {
      throw handleDBError(error);
    }
  };
  const deleteById = async (id) => {
    try {
      const deleted = await klantRepository.deleteById(id);
  
      if (!deleted) {
        throw ServiceError.notFound(`No klant with id ${id} exists`, { id });
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