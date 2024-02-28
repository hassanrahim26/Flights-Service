const { StatusCodes } = require('http-status-codes');

const { AirportService } = require('../services/');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST:
 * /airports
 * req-body {name: 'IGI', cityId: 3, code: 'DEL'}
 */
async function createAirport(req, res) {
    try{
        //console.log(req.body);
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.data = airport;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
};

/**
 * GET
 * /airports
 */
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
};

/**
 * GET
 * /airports/:id
 */
async function getAirportById(req, res){
    try {
        const airport = await AirportService.getAirportById(req.params.id);
        SuccessResponse.data = airport;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
};

/**
 * Delete
 * /airports/:id
 */
async function destroyAirport(req, res) {
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = airport;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
};

/**
 * Patch
 * /airports/:id
 */
async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirport(
            req.params.id, {
            
        });
        SuccessResponse.data = airport;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
};

module.exports = {
    createAirport,
    getAirports,
    getAirportById,
    destroyAirport,
    updateAirport
}