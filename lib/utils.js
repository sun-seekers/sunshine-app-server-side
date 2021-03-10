const request = require('superagent');

function getUniqueCityByDistance(zipCodeData, distance) {
  const cityArr = zipCodeData.body.zip_codes;
  //Use reduce to iterate through the city array and return an array of unique cities
  //A is equal to the array we want (line 44)
  //B is a unique city inside the original array
  const uniqueCity = cityArr.reduce((a, b) => {
    //Some is used to check if anything matches inside the array
    //If anything on the right of zip is true it doesn't add anything to the array [a]
    if (a.some(zip => zip.city === b.city))
      return a;

    //If above is false, push the new unique city to the accumulator array
    a.push(b);
    return a;
  }, []);

  const filteredCities = uniqueCity
    .filter(city => city.distance > distance - 25);
  return filteredCities;
}

async function allWeather(uniqueCities, sortBy, sortOrder, day) {
  const mappedData = await Promise.all(uniqueCities.map(async ({ zip_code, city, state, distance }) => {
    const formattedWeather = await getWeather(zip_code, day);
    const {
      forecast,
      temperature,
      date,
      clouds,
    } = formattedWeather;

    const tempFahrenheit = temperature * 9 / 5 + 32;
    
    return {
      zip_code,
      city,
      state,
      distance: Math.round(distance),
      driving: 0,
      forecast,
      temperature: Math.ceil(tempFahrenheit),
      date,
      clouds
    };
  }));
  const filteredData = mappedData.filter(city => city.clouds <= 50);
  const sortedData = sortOrder === 'asc'
    ? filteredData.sort((a, b) => a[sortBy] - b[sortBy])
    : filteredData.sort((a, b) => b[sortBy] - a[sortBy]);
  return sortedData;
}

async function getWeather(zip_code, day) {
  const weatherItem = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&postal_code=${zip_code}`);

  const item = weatherItem.body.data[day];
  return {
    forecast: item.weather.description,
    temperature: item.app_max_temp,
    date: item.datetime,
    clouds: item.clouds
  };
}
  
module.exports = {
  getUniqueCityByDistance,
  getWeather,
  allWeather
};