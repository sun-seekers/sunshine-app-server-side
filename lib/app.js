const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');
const { getUniqueCityByDistance, allWeather } = require('./utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

app.use('/auth', authRoutes);

app.use('/api', ensureAuth);

app.get('/api/test', (req, res) => {
  res.json({
    message: `in this protected route, we get the user's id like so: ${req.userId}`
  });
});

//Once endpoint that handles both calls
//Get weather by zip code endpoint
app.get('/api/sunshine', async (req, res) => {
  try {
    const zipCode = req.query.zip_code;
    const distance = req.query.distance;
    const sortBy = req.query.sort_by;
    const sortOrder = req.query.sort_order;
    //Hit the zip code API first to return the zip to the weather API
    const zipCodeData = await request.get(`https://www.zipcodeapi.com/rest/${process.env.ZIP_CODE_KEY}/radius.json/${zipCode}/${distance}/mile`);
    //This is an array of unique zip codes
    const uniqueCities = getUniqueCityByDistance(zipCodeData, distance);
    //Hit the weather API second to return the weather data to the front end
    const cityWeather = await allWeather(uniqueCities, sortBy, sortOrder);
    
    res.json(cityWeather);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//Get all trips
app.get('/api/trips', async (req, res) => {
  try {
    const data = await client.query(`
    SELECT *
    FROM trips
    WHERE user_id=$1`, [req.userId]);

    res.json(data.rows);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Get trip by city(id) endpoint 
app.get('/api/trips/:city', async (req, res) => {
  try {
    const data = await client.query(`
    SELECT * 
    FROM trips 
    WHERE city=$1
    AND user_id=$2`, [req.params.city, req.userId]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Post endpoint for Trips page
app.post('/api/trips', async (req, res) => {
  try {
    const data = await client.query(`
    INSERT INTO trips (city, distance, state, visited, user_id) 
    VALUES ($1, $2, $3, false, $4) 
    RETURNING *`,
    [
      req.body.city,
      req.body.distance,
      req.body.state,
      req.userId
    ]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Put endpoint to update visited true
app.put('/api/trips/:city', async (req, res) => {
  try {
    //The where is the SQL id
    const data = await client.query(`
    UPDATE trips 
    SET visited = true  
    WHERE city=$1 
    AND user_id=$2
    RETURNING *`,
    [
      req.params.city,
      req.userId,
    ]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Delete by city(id)
app.delete('/api/trips/:city', async (req, res) => {
  try {
    const data = await client.query(`
    DELETE FROM trips
    WHERE city=$1
    RETURNING *`, [req.params.city]);

    res.json(data.rows);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;

