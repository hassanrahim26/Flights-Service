const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services/');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST: /airplanes
 * req-body {modelNumber: 'airbus a320', capacity: 520}
 */

async function createAirplane(req, res) {
    try{
        //console.log(req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
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

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
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

async function getAirplaneById(req, res){
    try {
        const airplanes = await AirplaneService.getAirplaneById(req.params.id);
        SuccessResponse.data = airplanes;
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

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplaneById
}