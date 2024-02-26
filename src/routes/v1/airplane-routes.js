const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');
const router = express.Router();

/**
 * GET
 * /api/v1/airplanes
 */
router.get('/', 
        AirplaneController.getAirplanes
);

/**
 * GET
 * /api/v1/airplane/:id
 */
router.get('/:id', 
        AirplaneController.getAirplaneById
);

/**
 * POST
 * /api/v1/airplanes 
 */
router.post('/', 
        AirplaneMiddlewares.validateCreateRequest,
        AirplaneController.createAirplane
);

/**
 * DELETE
 * /api/v1/airplane/:id
 */
router.delete('/:id', 
        AirplaneController.destroyAirplane
);
  
module.exports = router;