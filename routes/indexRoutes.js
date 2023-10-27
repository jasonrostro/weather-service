// Import necessary modules
const express = require('express'); // Require Express.
const router = express.Router(); // Create a router.

const WhetherRoutes = require("./WhetherRoutes"); // Import WhetherRoutes.
router.use('/api', WhetherRoutes); // Use WhetherRoutes under '/api'.

// Export the router for use in your application.
module.exports = router;
