const ServiceError = require("../core/serviceError");
const handleDBError = require("./_handleDBError");
const betalingRepository = require("../repository/betaling");
const huurlocatieService = require("./huurlocatie");

const getAll = async (klantId, isAdmin) => {
    try {
        let betalingen;
        if (isAdmin) {
            // Haal alle betalingen op voor admins
            betalingen = await betalingRepository.findAllForAdmin();
        } else {
            // Haal betalingen op voor een specifieke klant
            betalingen = await betalingRepository.findAll(klantId);
        }

        // Voeg de naam van de huurlocatie toe aan elke betaling
        return betalingen.map((betaling) => ({
            ...betaling,
            huurlocatieNaam: betaling.huurlocatie.naam, // Voeg hier de naam van de huurlocatie toe
        }));
    } catch (error) {
        throw handleDBError(error);
    }
};

const getById = async (id, klantId) => {
    try {
        const betaling = await betalingRepository.findById(id);

        if (!betaling || (betaling.klant.id !== klantId && !klantId)) {
            throw ServiceError.notFound(`No betaling with id ${id} exists`, {
                id,
            });
        }
        return betaling;
    } catch (error) {
        throw handleDBError(error);
    }
};

const create = async ({
    bedrag,
    betaalmethode,
    datum,
    huurlocatieId,
    klantId,
}) => {
    try {
        const existingHuurlocatie = await huurlocatieService.getById(
            huurlocatieId
        );

        if (!existingHuurlocatie) {
            throw ServiceError.notFound(
                `There is no huurlocatie with id ${huurlocatieId}.`,
                {
                    id: huurlocatieId,
                }
            );
        }

        const id = await betalingRepository.create({
            bedrag,
            betaalmethode,
            datum,
            huurlocatieId,
            klantId,
        });
        return getById(id, klantId);
    } catch (error) {
        throw handleDBError(error);
    }
};

const updateById = async (
    id,
    { bedrag, betaalmethode, datum, huurlocatieId, klantId }
) => {
    try {
        const existingHuurlocatie = await huurlocatieService.getById(
            huurlocatieId
        );

        if (!existingHuurlocatie) {
            throw ServiceError.notFound(
                `There is no huurlocatie with id ${huurlocatieId}.`,
                {
                    id: huurlocatieId,
                }
            );
        }

        await betalingRepository.updateById(id, {
            bedrag,
            betaalmethode,
            datum,
            huurlocatieId,
            klantId,
        });

        return getById(id, klantId);
    } catch (error) {
        throw handleDBError(error);
    }
};

const deleteById = async (id, klantId, isAdmin) => {
    try {
        const deleted = await betalingRepository.deleteById(
            id,
            klantId,
            isAdmin
        );

        if (!deleted) {
            throw ServiceError.notFound(`No betaling with id ${id} exists`, {
                id,
            });
        }
    } catch (error) {
        throw handleDBError(error);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
