const { MOTOR_DETAILS, Klant, Reservering, Betaling, Huurlocatie } = require('../data/mock_data');

const getAll = () => {
  return { items: MOTOR_DETAILS, count: MOTOR_DETAILS.length };
};

const getById = (id) => {
  return MOTOR_DETAILS.find((motor) => motor.id === id);
};

const create = ({ name, price, date, available, rating, image, klant, huur_locatie }) => {
  let existingHuurLocatie;
  if (huur_locatie) {
    existingHuurLocatie = Huurlocatie.find((locatie) => locatie.id === huur_locatie.id);

    if (!existingHuurLocatie) {
      throw new Error(`There is no huur_locatie with id ${huur_locatie.id}.`);
    }
  }

  if (typeof klant === 'string') {
    klant = { id: Math.floor(Math.random() * 100000), name: klant };
  }

  const maxId = Math.max(...MOTOR_DETAILS.map((motor) => motor.id));

  const newMotor = {
    id: maxId + 1,
    name,
    price,
    date,
    available,
    rating,
    image,
    klant,
    huur_locatie: existingHuurLocatie,
  };

  MOTOR_DETAILS.push(newMotor); // 👈 4
  return newMotor;
};


const updateById = (id, { name, price, date, available, rating, image, klant, huur_locatie }) => {
  const index = MOTOR_DETAILS.findIndex((motor) => motor.id === id);

  if (index !== -1) {
    MOTOR_DETAILS[index] = {
      id,
      name,
      price,
      date,
      available,
      rating,
      image,
      klant,
      huur_locatie,
    };
    return MOTOR_DETAILS[index];
  } else {
    return null; 
  }
};

const deleteById = (id) => {
  const index = MOTOR_DETAILS.findIndex((motor) => motor.id === id);

  if (index !== -1) {
    const deletedMotor = MOTOR_DETAILS.splice(index, 1);
    return deletedMotor[0];
  } else {
    return null; 
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
