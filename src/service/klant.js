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

const create = async ({ klant_id, voornaam, achternaam, straat, huisnummer, postcode }) => {
  const existingKlant = await klantRepository.getById(klant_id);

  if (existingKlant) {
    throw new ServiceError(`Een klant met id ${klant_id} bestaat al.`);
  }
  try {
    const id = await klantRepository.create({
      klant_id,
      voornaam,
      achternaam,
      straat,
      huisnummer,
      postcode,
    });
    return getById(id);
  } catch (error) {
    handleDBError(error);
    }
  };

  const updateById = async (id, { klant_id, voornaam, achternaam, straat, huisnummer, postcode }) => {
    const existingKlant = await klantRepository.getById(id);
  
    if (!existingKlant) {
      throw ServiceError.notFound(`Geen klant gevonden met id: ${id}`);
    }
  
    await klantRepository.updateById(id, {
      klant_id,
      voornaam,
      achternaam,
      straat,
      huisnummer,
      postcode,
    });
  
    return getById(id);
  };
  

const deleteById = async (id) => {
  const deletedKlant = await klantRepository.deleteById(id);
  
  if (!deletedKlant) {
    throw ServiceError.notFound(`Geen klant gevonden met id: ${id}`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};