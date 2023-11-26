const ServiceError = require('../core/serviceError');

const handleDBError = (error) => {
  const { code = '', sqlMessage } = error; 

  if (code === 'ER_DUP_ENTRY') {
    switch (true) {
      case sqlMessage.includes('idx_huurlocatie_name_unique'):
        return ServiceError.validationFailed(
          'A huurlocatie with this name already exists'
        );
      case sqlMessage.includes('idx_klant_name_unique'):
        return ServiceError.validationFailed(
          'There is already a klant with this name'
        );
      default:
        return ServiceError.validationFailed('This item already exists');
    }
  }

  if (code.startsWith('ER_NO_REFERENCED_ROW')) {
    switch (true) {
      case sqlMessage.includes('fk_motor_user'):
        return ServiceError.notFound('This klant does not exist');
      case sqlMessage.includes('fk_motor_huurlocatie'):
        return ServiceError.notFound('This huurlocatie does not exist');
    }
  }

  return error;
};

module.exports = handleDBError; 
