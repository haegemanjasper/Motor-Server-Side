const ServiceError = require('../core/serviceError'); // 👈 1
const handleDBError = require('./_handleDBError'); // 👈 1
const huurlocatieRepository = require('../../repository/huurlocatie');


const getAll = async () => {
  const items = await huurlocatieRepository.findAll();
  return {
    items,
    count: items.length,
  };
};

const getById = async (id) => {
  const huurlocatie = await huurlocatieRepository.findById(id);
  if (!huurlocatie) {
    throw ServiceError.notFound(`Geen huurlocatie gevonden met id: ${id}`);
  }
  return huurlocatie;
};

const create = async (huurlocatie) => {
  const id = await huurlocatieRepository.create(huurlocatie);
  return getById(id);
}
const updateById = async (id, huurlocatie) => {
  try {
    const existingHuurlocatie = await huurlocatieRepository.update(id, huurlocatie);

    if (!existingHuurlocatie) {
      throw ServiceError.notFound(`No huurlocatie with id ${id} exists`, { id });
    }

    return getById(id);
  } catch (error) {
    throw handleDBError(error);
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await huurlocatieRepository.deleteById(id);

    if (!deleted) {
      throw ServiceError.notFound(`No huurlocatie with id ${id} exists`, { id });
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
