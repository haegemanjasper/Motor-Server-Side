const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBError');
const motorRepository = require('../../repository/motor');
const motorService = require('./huurlocatie');

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
const create = async ({ motor_id, datum, beschikbaarheid, huurprijs_per_dag, merk, model, rating, klant, huur_locatie }) => {
  const existingHuurLocatie = await motorService.getById(huur_locatie.id);

    if (!existingHuurLocatie) {
      throw ServiceError.notFound(`Geen huurlocatie gevonden met id: ${huur_locatie.id}`);
  }

try {
 const id = await motorRepository
 .create({
  motor_id,
  datum,
  beschikbaarheid,
  huurprijs_per_dag,
  merk,
  model,
  rating,
  //image,
  klant_id: klant.id,
  huur_locatie_id: huur_locatie.id,
  });
    return getById(id);
} catch (error) {
  throw handleDBError(error);
}
};

//image toevoegen?
const updateById = async (id, { motor_id, datum, beschikbaarheid, huurprijs_per_dag, merk, model, rating, klant, huur_locatie }) => {
 if (huur_locatie && huur_locatie.id) {
  const existingHuurLocatie = await motorService.getById(huur_locatie.id);

    if (!existingHuurLocatie) {
      throw ServiceError.notFound(`Geen huurlocatie gevonden met id: ${huur_locatie.id}`);
    }
  }
 
  await motorRepository.updateById(id, {
    motor_id,
    datum,
    beschikbaarheid,
    huurprijs_per_dag,
    merk,
    model,
    rating,
    //image,
    klant_id: klant.id,
    huur_locatie_id: huur_locatie.id,
  });
  return getById(id);
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
