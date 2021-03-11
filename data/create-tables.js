const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(256) NOT NULL,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                );           
                CREATE TABLE trips (
                    id SERIAL PRIMARY KEY NOT NULL,
                    city VARCHAR(512) NOT NULL,
                    state VARCHAR(512) NOT NULL,
                    distance VARCHAR(512) NOT NULL,
                    visited BOOLEAN NOT NULL, 
                    zip_code INTEGER NOT NULL,
                    user_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch (err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
