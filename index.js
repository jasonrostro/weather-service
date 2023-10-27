// Import required modules
const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4040;
const cors = require('cors');
const morgan = require('morgan');
const indexRouters = require('./routes/indexRoutes');

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Morgan for logging
app.use(morgan('dev'));

// Define routes using indexRouters
app.use('/', indexRouters);

// Respond to the root URL with a welcome message
app.get('/', async (req, res) => {
    res.send('Welcome To Weather Service');
});

if (require.main === module) {
    // Only start the server if this script is run directly (not imported as a module)
    app.listen(PORT, () => {
        console.log(`INFO: Weather Service On Port To ${PORT}`);
    });
}

module.exports = app;