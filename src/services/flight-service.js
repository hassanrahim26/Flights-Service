const {StatusCodes} = require('http-status-codes');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helper');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        if (!compareTime(data.arrivalTime, data.departureTime)) {
            throw new AppError('Arrival time must be later than departure time', StatusCodes.BAD_REQUEST);
        }
        return flight;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if(error.message == 'Arrival time must be later than departure time'){
            return error;
        }

        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
}; 