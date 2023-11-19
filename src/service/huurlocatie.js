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
    throw Error (`Geen huurlocatie gevonden met id: ${id}`);
  }
  return huurlocatie;
};

const create = async ({ straat, nummer, postcode}) => {
  const id = await huurlocatieRepository.create({
   straat,
   nummer,
   postcode,
  });

  return getById(id);
};

const updateById = async (id, { straat, nummer, postcode }) => {
   await huurlocatieRepository.updateById(id, {
    straat,
    nummer,
    postcode,
  });

  return getById(id);
};

const deleteById = async (id) => {
  const deletedHuurlocatie = await huurlocatieRepository.deleteById(id);
  
  if (!deletedHuurlocatie) {
    throw Error (`Geen huurlocatie gevonden met id: ${id}`);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
