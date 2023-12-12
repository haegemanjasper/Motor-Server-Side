const klantRepository = require("../repository/klant");
const ServiceError = require("../core/serviceError");
const { hashPassword, verifyPassword } = require("../core/password");
const { generateJWT, verifyJWT } = require("../core/jwt");
const Role = require("../core/roles");
const { getLogger } = require("../core/logging");

const handleDBError = require("./_handleDBError");

const makeExposedKlant = ({
  id,
  naam,
  voornaam,
  email,
  straat,
  huisnummer,
  postcode,
  stad,
  roles,
}) => ({
  id,
  naam,
  voornaam,
  email,
  straat,
  huisnummer,
  postcode,
  stad,
  roles,
});

const makeLoginData = async (klant) => {
  const token = await generateJWT(klant);
  return {
    klant: makeExposedKlant(klant),
    token,
  };
};

const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ServiceError.unauthorized("Invalid authentication token");
  }

  const authToken = authHeader.substring(7);
  try {
    const { roles, klantId } = await verifyJWT(authToken);

    return {
      klantId,
      roles,
      authToken,
    };
  } catch (error) {
    getLogger().error(error.message, { error });
    throw new Error(error.message);
  }
};

const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden("You do not have permission to do this");
  }
};

const login = async (email, password) => {
  const klant = await klantRepository.findByEmail(email);

  if (!klant) {
    throw ServiceError.unauthorized(
      "The given email and password do not match"
    );
  }

  const passwordValid = await verifyPassword(password, klant.password_hash);

  if (!passwordValid) {
    throw ServiceError.unauthorized(
      "The given email and password do not match"
    );
  }

  return makeLoginData(klant);
};

/**
 * Get all users.
 */

const getAll = async () => {
  const items = await klantRepository.findAll();
  return {
    items: items.map(makeExposedKlant),
    count: items.length,
  };
};

const getById = async (id) => {
  const klant = await klantRepository.findById(id);

  if (!klant) {
    throw ServiceError.notFound(`No klant with id ${id} exists`, { id });
  }
  return makeExposedKlant(klant);
};

const register = async ({
  naam,
  voornaam,
  email,
  straat,
  huisnummer,
  postcode,
  stad,
  password,
}) => {
  try {
    const passwordHash = await hashPassword(password);

    const klantId = await klantRepository.create({
      naam,
      voornaam,
      email,
      straat,
      huisnummer,
      postcode,
      stad,
      passwordHash,
      roles: [Role.KLANT],
    });
    const klant = await klantRepository.findById(klantId);
    return await makeLoginData(klant);
  } catch (error) {
    throw handleDBError(error);
  }
};

const updateById = async (
  id,
  { naam, voornaam, email, straat, huisnummer, postcode, stad }
) => {
  try {
    await klantRepository.updateById(id, {
      naam,
      voornaam,
      email,
      straat,
      huisnummer,
      postcode,
      stad,
    });
    return getById(id);
  } catch (error) {
    throw handleDBError(error);
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await klantRepository.deleteById(id);

    if (!deleted) {
      throw ServiceError.notFound(`No klant with id ${id} exists`, { id });
    }
  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = {
  checkAndParseSession,
  checkRole,
  login,
  getAll,
  getById,
  register,
  updateById,
  deleteById,
};
