// not a lot to say here! looks like a clean CRUD API!
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

//GET zip code and weather from the API
app.get('/api/sunshine', async (req, res) => {
  try {
    const { 
      zip_code: zipCode,
      distance,
      sort_by: sortBy,
      sort_order: sortOrder,
      day
    } = req.query;
    //Hit the zip code API first to return the zip to the weather API
    const zipCodeData = await request.get(`https://www.zipcodeapi.com/rest/${process.env.ZIP_CODE_KEY}/radius.json/${zipCode}/${distance}/mile`);
    //This is an array of unique zip codes
    const uniqueCities = getUniqueCityByDistance(zipCodeData, distance);
    //Hit the weather API second to return the weather data to the front end

    try {
      const cityWeather = await allWeather(uniqueCities, sortBy, sortOrder, day);
      res.json(cityWeather);
    } catch (e) {
      const cityWeather = await allWeather(uniqueCities, sortBy, sortOrder, day);
      res.json(cityWeather);
    }

  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//Get all favorites for the trips page
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

//Get favorite by zip(id) on the Trips page 
app.get('/api/trips/:zip', async (req, res) => {
  try {
    const data = await client.query(`
    SELECT * 
    FROM trips 
    WHERE zip_code = $1
    AND user_id = $2`, [req.params.zip, req.userId]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Post a new favorite to the Trips page
app.post('/api/trips', async (req, res) => {
  try {
    const data = await client.query(`
    INSERT INTO trips (city, distance, state, visited, zip_code, user_id) 
    VALUES ($1, $2, $3, false, $4, $5) 
    RETURNING *`,
    [
      req.body.city,
      req.body.distance,
      req.body.state,
      req.body.zip_code,
      req.userId
    ]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Put to update favorites for visited locations
app.put('/api/trips/:zip', async (req, res) => {
  try {
    //The where is the SQL id
    const data = await client.query(`
    UPDATE trips 
    SET visited = true  
    WHERE zip_code = $1 
    AND user_id = $2
    RETURNING *`,
    [
      req.params.zip,
      req.userId,
    ]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Delete to remove favorited zip(id) on the Trips page
app.delete('/api/trips/:zip', async (req, res) => {
  try {
    const data = await client.query(`
    DELETE FROM trips
    WHERE zip_code = $1
    RETURNING *`, [req.params.zip]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;

