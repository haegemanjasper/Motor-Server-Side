const { KTM_DETAILS, BMW_DETAILS, KAWA_DETAILS, HONDA_DETAILS, HARLEYD_DETAILS, YAMAHA_DETAILS } = require('../data/mock_data');

const getAll = () => {
  return { 
    items: [KTM_DETAILS, BMW_DETAILS, KAWA_DETAILS, HONDA_DETAILS, HARLEYD_DETAILS, YAMAHA_DETAILS],
    count: {
      KTM: KTM_DETAILS.length,
      BMW: BMW_DETAILS.length,
      KAWA: KAWA_DETAILS.length,
      HONDA: HONDA_DETAILS.length,
      HARLEY: HARLEYD_DETAILS.length,
      YAMAHA: YAMAHA_DETAILS.length
    }
  };
};

const getById = (id, name) => {
  let MotorArray;

  switch (name) {
    case 'KTM':
      MotorArray = KTM_DETAILS;
      break;
    case 'BMW':
      MotorArray = BMW_DETAILS;
      break;
    case 'KAWA':
      MotorArray = KAWA_DETAILS;
      break;
    case 'HONDA':
      MotorArray = HONDA_DETAILS;
      break;
    case 'HARLEY':
      MotorArray = HARLEYD_DETAILS;
      break;
    case 'YAMAHA':
      MotorArray = YAMAHA_DETAILS;
      break;
    default:
      throw new Error(`Motor brand '${name}' is not recognized.`);
  }

  const motor = MotorArray.find((motorItem) => motorItem.id === id);

  if (!motor) {
    throw new Error(`There is no motor with id ${id}.`);
  }

  return motor;
};

/*const create = ({ name, price, available, rating }) => {
  const validBrandPattern = /^[A-Za-z0-9\s\-_]*$/;
  const brandMatch = name.match(validBrandPattern);

  if (brandMatch) {
    const brand = name; // Gebruik de naam zoals deze is ingevoerd, zonder forceren naar hoofdletters
    let MotorArray;

    switch (brand) {
      case 'KTM':
        MotorArray = KTM_DETAILS;
        break;
      case 'BMW':
        MotorArray = BMW_DETAILS;
        break;
      case 'KAWA':
        MotorArray = KAWA_DETAILS;
        break;
      case 'HONDA':
        MotorArray = HONDA_DETAILS;
        break;
      case 'HARLEY':
        MotorArray = HARLEYD_DETAILS;
        break;
      case 'YAMAHA':
        MotorArray = YAMAHA_DETAILS;
        break;
      default:
        throw new Error(`Motor brand '${brand}' is not recognized.`);
    }

    if (!MotorArray) {
      throw new Error(`Motor brand not specified.`);
    }

    if (typeof price !== 'number' || price <= 0) {
      throw new Error('Price should be a positive number.');
    }

    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      throw new Error('Rating should be a number between 0 and 5.');
    }

    const maxId = Math.max(...MotorArray.map((motor) => motor.id));
    const newMotor = {
      id: maxId + 1,
      name: brand,
      price,
      available,
      rating,
    };
    MotorArray.push(newMotor);
    console.log(`Motor met merk '${brand}' is aangemaakt.`);
    return newMotor;
  } else {
    throw new Error(`Ongeldige motorbrand '${name}'.`);
  }
}; */

const create = ({ name, price, available, rating }) => {
  let MotorArray;

  switch (name) {
    case 'KTM':
      MotorArray = KTM_DETAILS;
      break;
    case 'BMW':
      MotorArray = BMW_DETAILS;
      break;
    case 'KAWA':
      MotorArray = KAWA_DETAILS;
      break;
    case 'HONDA':
      MotorArray = HONDA_DETAILS;
      break;
    case 'HARLEY':
      MotorArray = HARLEYD_DETAILS;
      break;
    case 'YAMAHA':
      MotorArray = YAMAHA_DETAILS;
      break;
    default:
      throw new Error(`Motor brand '${name}' is not recognized.`);
  }

  if (!MotorArray) {
    throw new Error(`Motor brand not specified.`);
  }
  const maxId = Math.max(...MotorArray.map((motor) => motor.id));

  const newMotor = {
    id: maxId + 1,
    name,
    price,
    available,
    rating,
  };

  MotorArray.push(newMotor);
  return newMotor;
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
