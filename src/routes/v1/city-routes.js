const express = require('express');
const { CityController } = require('../../controllers');
const router = express.Router();

/**
 * POST
 * /api/v1/city 
 */
router.post('/', 
        CityController.createCity
);


module.exports = router;