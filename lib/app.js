const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');

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

//Get zip code radius endpoint
app.get('/api/zip', async (req, res) => {
  try {
    const zip = req.query.zip_code;
    const distance = req.query.distance;

    const zipURL = await request.get(`https://www.zipcodeapi.com/rest/${process.env.ZIP_CODE_API}/radius.json/${zip}/${distance}/mile`);

    res.json(zipURL.body.zip_codes);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Get weather by zip code endpoint

//Get trip by city(id) endpoint 
app.get('/api/zip', async (req, res) => {
  try {
    const data = await client.query('SELECT * from animals');

    res.json(data.rows);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

//Post endpoint for Trips page

//Put endpoint to update visited true

//Delete by city(id)

app.use(require('./middleware/error'));

module.exports = app;
