const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares')
const router = express.Router();

/**
 * POST
 * /api/v1/cities 
 */
router.post('/', 
        CityMiddlewares.validateCreateRequest,
        CityController.createCity
);

/**
 * GET
 * /api/v1/cities
 */
router.get('/', 
        CityController.getCity
);

/**
 * GET
 * /api/v1/cities/:id
 */
router.get('/:id', 
        CityController.getCityById
);

/**
 * DELETE
 * /api/v1/cities/:id
 */
router.delete('/:id', 
        CityController.destroyCity
);

/**
 * UPDATE
 * /api/v1/cities/:id
 */
router.patch('/:id', 
        CityController.updateCity
);

module.exports = router;