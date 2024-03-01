const {StatusCodes} = require('http-status-codes');
const { Op } = require('sequelize');
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

async function getAllFlights(query){
    let customFilter = {}, sortFilter = {};
    const endingTripTime = " 06:30:00";

    if(query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;

        if(departureAirportId == arrivalAirportId){
            throw new AppError('departureAirportId and arrivalAirportId cannot be same', StatusCodes.BAD_REQUEST)
        }
    }

    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice == undefined) ? 20000 : maxPrice]
        }
    }

    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if(query.sort) {
        const params = query.sort.split(",");
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }
    //console.log(customFilter, sortFilter);
    try {
        const flights = flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights
}; 