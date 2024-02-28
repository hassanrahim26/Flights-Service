const express = require('express');
const { AirportController } = require('../../controllers');
const { AirportMiddlewares } = require('../../middlewares');
const router = express.Router();

/**
 * GET
 * /api/v1/airports
 */
router.get('/', 
        AirportController.getAirports
);

/**
 * GET
 * /api/v1/airports/:id
 */
router.get('/:id', 
        AirportController.getAirportById
);

/**
 * POST
 * /api/v1/airports 
 */
router.post('/', 
        AirportMiddlewares.validateCreateRequest,
        AirportController.createAirport
);

/**
 * DELETE
 * /api/v1/airports/:id
 */
router.delete('/:id', 
        AirportController.destroyAirport
);

/**
 * UPDATE
 * /api/v1/airports/:id
 */
router.patch('/:id', 
        AirportController.updateAirport
);

module.exports = router;