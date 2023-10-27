// Import the Axios library for making HTTP requests
const axios = require('axios');

// Define a function to fetch weather data
const getWeatherData = async (req, res) => {
    try {
        // Set the OpenWeatherMap API key
        const apiKey = process.env.APPID;

        // Extract city, state, and limit parameters from the request
        const city = req.query.city;
        const state = req.query.state;
        const limit = req.query.limit;

        // Declare variables for latitude, stateData, and index
        let lat;
        let stateData;
        let index;

        // Fetch geographical data from OpenWeatherMap based on city and state
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
            params: {
                q: `${city},${state}`,
                limit: limit,
                appid: apiKey,
            },
        });

        // Extract response data
        const responseData = response.data;

        // Loop through the response data to find a matching state
        for (index = 0; index < responseData.length; index++) {
            stateData = responseData[index].state;

            if (stateData === req.query.state) {
                // If a match is found, update lat and lon, and break the loop
                lat = responseData[index].lat;
                lon = responseData[index].lon;
                break;
            }
        }

        // Check if any data was found
        if (responseData.length !== 0) {
            if (stateData === req.query.state) {
                // Use latitude and longitude from the matching state
                lat = responseData[index].lat;
                lon = responseData[index].lon;
            } else {
                // Use latitude and longitude from the first result
                lat = responseData[0].lat;
                lon = responseData[0].lon;
            }

            // Fetch weather data from OpenWeatherMap based on latitude and longitude
            const newResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: apiKey,
                },
            });

            // Extract the new data
            const newData = newResponse.data;

            const id = newData.id;
            console.log(id);

            // Seems like it requires premium key
            // const forcastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?`, {
            //     params: {
            //         lat,
            //         lon,
            //         appid: apiKey
            //     }
            // });
            
            //Fetch forecast weather data from OpenWeatherMap based on id generated from the above.
            const forcastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    id: id,
                    appid: apiKey
                }
            });
            // Send the weather data in the response
            res.send({ current: newData, forecast: forcastResponse.data});
        } else {
            // Send a message if latitude and longitude are not found
            res.send({ message: "latitude and longitude not found" });
        }
    } catch (error) {
        // Handle errors
        res.status(500).send({ message: 'Error fetching weather data', error: error });
    }
};

// Export the getWeatherData function
module.exports = {
    getWeatherData
}