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
    throw Error (`Geen motor gevonden met id: ${id}`);
  }

  return motor;
};

const create = async ({ name, price, date, available, rating, image, klant, huur_locatie }) => {
  const existingHuurLocatie = await motorService.getById(huur_locatie.id);

    if (!existingHuurLocatie) {
      throw Error (`Geen huurlocatie gevonden met id: ${huur_locatie.id}`);
  }

 const id = await motorRepository.create({
    name,
    price,
    date,
    available,
    rating,
    image,
    klant,
    huur_locatie: existingHuurLocatie,
  });
    return getById(id);
}

const updateById = async (id, { name, price, date, available, rating, image, klant, huur_locatie }) => {
 if (huur_locatie) {
  const existingHuurLocatie = await motorService.getById(huur_locatie.id);

    if (!existingHuurLocatie) {
      throw Error (`Geen huurlocatie gevonden met id: ${huur_locatie.id}`);
    }
  }
 
  await motorRepository.updateById(id, {
    name,
    price,
    date,
    available,
    rating,
    image,
    klant,
    huur_locatie: existingHuurLocatie,
  });
  return getById(id);
};

const deleteById = async (id) => {
  const deleted = await motorRepository.deleteById(id);

  if (!deleted) {
    throw Error (`Geen motor gevonden met id: ${id}`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
