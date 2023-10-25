let { KTM_DETAILS, BMW_DETAILS, KAWA_DETAILS, HONDA_DETAILS, HARLEYD_DETAILS, YAMAHA_DETAILS } = require('../data/mock_data');

const getAll = () => {
  return { 
    items: [KTM_DETAILS, BMW_DETAILS, KAWA_DETAILS, HONDA_DETAILS, HARLEYD_DETAILS, YAMAHA_DETAILS],
     count: {
     KTM: KTM_DETAILS.length,
     BMW: BMW_DETAILS.length,
     KAWA: KAWA_DETAILS.length,
     HONDA: HONDA_DETAILS.length,
     HARLEY: HARLEYD_DETAILS.length,
     YAMAHA: YAMAHA_DETAILS.length }
};
};

const getById = (id) => {
  throw new Error('Not implemented yet!');
};

const create = ({ name, price, available, rating }) => {
  throw new Error('Not implemented yet!');
};

const updateById = (id, { name, price, available, rating }) => {
  throw new Error('Not implemented yet!');
};

const deleteById = (id) => {
  throw new Error('Not implemented yet!');
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
