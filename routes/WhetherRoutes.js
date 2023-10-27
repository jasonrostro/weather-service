// Import Express and create a router
const express = require('express');
const router = express.Router();

// Route to fetch weather data, connected to a controller function
const { getWeatherData } = require('../controller/WhetherController');
router.get('/weather/data', getWeatherData);

// Export the router for use in your application
module.exports = router;
