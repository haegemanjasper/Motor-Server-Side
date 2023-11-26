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

const create = async ({ locatie_id, naam, straat, huisnummer, postcode }) => {
  const existingHuurLocatie = await huurlocatieRepository.getById(naam);

  if (existingHuurLocatie) {
    throw new ServiceError(`Een huurlocatie met id ${naam} bestaat al.`);
  }
  try {
    const id = await huurlocatieRepository.create({
      locatie_id,
      naam,
      straat,
      huisnummer,
      postcode,
    });
    return getById(id);
  } catch (error) {
    handleDBError(error);
    }
  };

  const updateById = async (id, { locatie_id,naam, straat, huisnummer, postcode }) => {
    const existingHuurLocatie = await huurlocatieRepository.getById(id);
  
    if (!existingHuurLocatie) {
      throw ServiceError.notFound(`Geen huurlocatie gevonden met id: ${id}`);
    }
  
    await huurlocatieRepository.updateById(id, {
      locatie_id,
      naam,
      straat,
      huisnummer,
      postcode,
    });
  
    return getById(id);
  };
  

const deleteById = async (id) => {
  const deletedHuurlocatie = await huurlocatieRepository.deleteById(id);
  
  if (!deletedHuurlocatie) {
    throw ServiceError.notFound(`Geen huurlocatie gevonden met id: ${id}`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
