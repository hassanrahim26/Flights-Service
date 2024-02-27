const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares')
const router = express.Router();

/**
 * POST
 * /api/v1/city 
 */
router.post('/', 
        CityMiddlewares.validateCreateRequest,
        CityController.createCity
);


module.exports = router;