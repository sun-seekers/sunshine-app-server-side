const client = require('../lib/client');
// import our seed data:
const trips = require('./trips.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (name, email, hash)
                      VALUES ($1, $2, $3)
                      RETURNING *;
                  `,
        [user.name, user.email, user.hash]);
      })
    );

    const user = users[0].rows[0];

    await Promise.all(
      trips.map(trip => {
        return client.query(`
                    INSERT INTO trips (
                      city, 
                      state, 
                      distance, 
                      visited,
                      zip_code, 
                      user_id)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
        [
          trip.city,
          trip.state,
          trip.distance,
          trip.visited,
          trip.zip_code,
          user.id]);
      })
    );


    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}
