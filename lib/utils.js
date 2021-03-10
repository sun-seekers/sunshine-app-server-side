const request = require('superagent');
const data = [
  {
    'zip_code': '97385',
    'city': 'Sublimity',
    'state': 'OR',
    'distance': 46.841,
    'forecast': 'Light rain',
    'temperature': 11.4,
    'date': '2021-03-09',
    'clouds': 68
  },
  {
    'zip_code': '97308',
    'city': 'Salem',
    'state': 'OR',
    'distance': 47.421,
    'forecast': 'Broken clouds',
    'temperature': 11.8,
    'date': '2021-03-09',
    'clouds': 56
  },
  {
    'zip_code': '97381',
    'city': 'Silverton',
    'state': 'OR',
    'distance': 41.781,
    'forecast': 'Moderate rain',
    'temperature': 11.3,
    'date': '2021-03-09',
    'clouds': 67
  },
  {
    'zip_code': '97375',
    'city': 'Scotts Mills',
    'state': 'OR',
    'distance': 38.753,
    'forecast': 'Light rain',
    'temperature': 9.6,
    'date': '2021-03-09',
    'clouds': 71
  },
  {
    'zip_code': '97371',
    'city': 'Rickreall',
    'state': 'OR',
    'distance': 47.497,
    'forecast': 'Broken clouds',
    'temperature': 11.1,
    'date': '2021-03-09',
    'clouds': 60
  },
  {
    'zip_code': '97307',
    'city': 'Keizer',
    'state': 'OR',
    'distance': 41.587,
    'forecast': 'Light rain',
    'temperature': 11.7,
    'date': '2021-03-09',
    'clouds': 62
  },
  {
    'zip_code': '97373',
    'city': 'Saint Benedict',
    'state': 'OR',
    'distance': 34.275,
    'forecast': 'Mix snow/rain',
    'temperature': 8.6,
    'date': '2021-03-09',
    'clouds': 71
  },
  {
    'zip_code': '97362',
    'city': 'Mount Angel',
    'state': 'OR',
    'distance': 33.838,
    'forecast': 'Light rain',
    'temperature': 11.8,
    'date': '2021-03-09',
    'clouds': 65
  },
  {
    'zip_code': '97101',
    'city': 'Amity',
    'state': 'OR',
    'distance': 43.502,
    'forecast': 'Light shower rain',
    'temperature': 10.9,
    'date': '2021-03-09',
    'clouds': 64
  },
  {
    'zip_code': '97038',
    'city': 'Molalla',
    'state': 'OR',
    'distance': 30.653,
    'forecast': 'Light rain',
    'temperature': 11.8,
    'date': '2021-03-09',
    'clouds': 66
  },
  {
    'zip_code': '97026',
    'city': 'Gervais',
    'state': 'OR',
    'distance': 34.605,
    'forecast': 'Broken clouds',
    'temperature': 11.9,
    'date': '2021-03-09',
    'clouds': 63
  },
  {
    'zip_code': '97071',
    'city': 'Woodburn',
    'state': 'OR',
    'distance': 30.01,
    'forecast': 'Light rain',
    'temperature': 11.8,
    'date': '2021-03-09',
    'clouds': 69
  },
  {
    'zip_code': '97017',
    'city': 'Colton',
    'state': 'OR',
    'distance': 26.993,
    'forecast': 'Light rain',
    'temperature': 10.3,
    'date': '2021-03-09',
    'clouds': 69
  },
  {
    'zip_code': '97032',
    'city': 'Hubbard',
    'state': 'OR',
    'distance': 26.528,
    'forecast': 'Light shower rain',
    'temperature': 12.1,
    'date': '2021-03-09',
    'clouds': 65
  },
  {
    'zip_code': '97114',
    'city': 'Dayton',
    'state': 'OR',
    'distance': 33.486,
    'forecast': 'Broken clouds',
    'temperature': 11.5,
    'date': '2021-03-09',
    'clouds': 64
  },
  {
    'zip_code': '97128',
    'city': 'Mcminnville',
    'state': 'OR',
    'distance': 40.063,
    'forecast': 'Broken clouds',
    'temperature': 11.1,
    'date': '2021-03-09',
    'clouds': 67
  },
  {
    'zip_code': '97137',
    'city': 'Saint Paul',
    'state': 'OR',
    'distance': 27.777,
    'forecast': 'Broken clouds',
    'temperature': 11.8,
    'date': '2021-03-09',
    'clouds': 64
  },
  {
    'zip_code': '97127',
    'city': 'Lafayette',
    'state': 'OR',
    'distance': 31.991,
    'forecast': 'Broken clouds',
    'temperature': 10.9,
    'date': '2021-03-09',
    'clouds': 65
  },
  {
    'zip_code': '97115',
    'city': 'Dundee',
    'state': 'OR',
    'distance': 28.008,
    'forecast': 'Broken clouds',
    'temperature': 10.8,
    'date': '2021-03-09',
    'clouds': 65
  },
  {
    'zip_code': '97111',
    'city': 'Carlton',
    'state': 'OR',
    'distance': 33.775,
    'forecast': 'Light rain',
    'temperature': 10.9,
    'date': '2021-03-09',
    'clouds': 62
  },
  {
    'zip_code': '97028',
    'city': 'Government Camp',
    'state': 'OR',
    'distance': 42.128,
    'forecast': 'Mix snow/rain',
    'temperature': 0.4,
    'date': '2021-03-09',
    'clouds': 71
  },
  {
    'zip_code': '97067',
    'city': 'Welches',
    'state': 'OR',
    'distance': 31.051,
    'forecast': 'Light snow',
    'temperature': 8.3,
    'date': '2021-03-09',
    'clouds': 73
  },
  {
    'zip_code': '97049',
    'city': 'Rhododendron',
    'state': 'OR',
    'distance': 38.126,
    'forecast': 'Mix snow/rain',
    'temperature': 8.4,
    'date': '2021-03-09',
    'clouds': 72
  },
  {
    'zip_code': '97148',
    'city': 'Yamhill',
    'state': 'OR',
    'distance': 33.804,
    'forecast': 'Overcast clouds',
    'temperature': 10.4,
    'date': '2021-03-09',
    'clouds': 71
  },
  {
    'zip_code': '97011',
    'city': 'Brightwood',
    'state': 'OR',
    'distance': 29.688,
    'forecast': 'Light snow',
    'temperature': 7.4,
    'date': '2021-03-09',
    'clouds': 74
  },
  {
    'zip_code': '97041',
    'city': 'Mount Hood Parkdale',
    'state': 'OR',
    'distance': 47.758,
    'forecast': 'Broken clouds',
    'temperature': 3,
    'date': '2021-03-09',
    'clouds': 66
  },
  {
    'zip_code': '97119',
    'city': 'Gaston',
    'state': 'OR',
    'distance': 29.469,
    'forecast': 'Overcast clouds',
    'temperature': 9.8,
    'date': '2021-03-09',
    'clouds': 71
  },
  {
    'zip_code': '97014',
    'city': 'Cascade Locks',
    'state': 'OR',
    'distance': 26.943,
    'forecast': 'Light rain',
    'temperature': 7.3,
    'date': '2021-03-09',
    'clouds': 69
  },
  {
    'zip_code': '97116',
    'city': 'Forest Grove',
    'state': 'OR',
    'distance': 27.543,
    'forecast': 'Light shower rain',
    'temperature': 9.2,
    'date': '2021-03-09',
    'clouds': 75
  },
  {
    'zip_code': '97117',
    'city': 'Gales Creek',
    'state': 'OR',
    'distance': 33.892,
    'forecast': 'Light rain',
    'temperature': 8.1,
    'date': '2021-03-09',
    'clouds': 75
  },
  {
    'zip_code': '97106',
    'city': 'Banks',
    'state': 'OR',
    'distance': 26.594,
    'forecast': 'Overcast clouds',
    'temperature': 8.9,
    'date': '2021-03-09',
    'clouds': 76
  },
  {
    'zip_code': '98639',
    'city': 'North Bonneville',
    'state': 'WA',
    'distance': 30.868,
    'forecast': 'Overcast clouds',
    'temperature': 9.7,
    'date': '2021-03-09',
    'clouds': 70
  },
  {
    'zip_code': '97125',
    'city': 'Manning',
    'state': 'OR',
    'distance': 30.286,
    'forecast': 'Overcast clouds',
    'temperature': 8.8,
    'date': '2021-03-09',
    'clouds': 77
  },
  {
    'zip_code': '98648',
    'city': 'Stevenson',
    'state': 'WA',
    'distance': 33.188,
    'forecast': 'Light rain',
    'temperature': 7.3,
    'date': '2021-03-09',
    'clouds': 69
  },
  {
    'zip_code': '97109',
    'city': 'Buxton',
    'state': 'OR',
    'distance': 31.299,
    'forecast': 'Light shower rain',
    'temperature': 8,
    'date': '2021-03-09',
    'clouds': 76
  },
  {
    'zip_code': '97144',
    'city': 'Timber',
    'state': 'OR',
    'distance': 36.652,
    'forecast': 'Overcast clouds',
    'temperature': 4.1,
    'date': '2021-03-09',
    'clouds': 74
  },
  {
    'zip_code': '98605',
    'city': 'Bingen',
    'state': 'WA',
    'distance': 48.048,
    'forecast': 'Mix snow/rain',
    'temperature': 7.7,
    'date': '2021-03-09',
    'clouds': 68
  },
  {
    'zip_code': '97064',
    'city': 'Vernonia',
    'state': 'OR',
    'distance': 37.862,
    'forecast': 'Overcast clouds',
    'temperature': 8.8,
    'date': '2021-03-09',
    'clouds': 73
  },
  {
    'zip_code': '98610',
    'city': 'Carson',
    'state': 'WA',
    'distance': 34.324,
    'forecast': 'Mix snow/rain',
    'temperature': 9.4,
    'date': '2021-03-09',
    'clouds': 69
  },
  {
    'zip_code': '97051',
    'city': 'Saint Helens',
    'state': 'OR',
    'distance': 28.763,
    'forecast': 'Broken clouds',
    'temperature': 10.6,
    'date': '2021-03-09',
    'clouds': 66
  },
  {
    'zip_code': '97018',
    'city': 'Columbia City',
    'state': 'OR',
    'distance': 26.973,
    'forecast': 'Broken clouds',
    'temperature': 10.8,
    'date': '2021-03-09',
    'clouds': 67
  },
  {
    'zip_code': '97054',
    'city': 'Deer Island',
    'state': 'OR',
    'distance': 32.624,
    'forecast': 'Light shower rain',
    'temperature': 9.9,
    'date': '2021-03-09',
    'clouds': 65
  },
  {
    'zip_code': '98601',
    'city': 'Amboy',
    'state': 'WA',
    'distance': 30.247,
    'forecast': 'Broken clouds',
    'temperature': 9.9,
    'date': '2021-03-09',
    'clouds': 67
  },
  {
    'zip_code': '98674',
    'city': 'Woodland',
    'state': 'WA',
    'distance': 28.719,
    'forecast': 'Broken clouds',
    'temperature': 10.8,
    'date': '2021-03-09',
    'clouds': 67
  },
  {
    'zip_code': '98625',
    'city': 'Kalama',
    'state': 'WA',
    'distance': 35.08,
    'forecast': 'Light shower rain',
    'temperature': 9.5,
    'date': '2021-03-09',
    'clouds': 63
  },
  {
    'zip_code': '97048',
    'city': 'Rainier',
    'state': 'OR',
    'distance': 39.55,
    'forecast': 'Light shower rain',
    'temperature': 9.2,
    'date': '2021-03-09',
    'clouds': 60
  },
  {
    'zip_code': '98603',
    'city': 'Ariel',
    'state': 'WA',
    'distance': 36.839,
    'forecast': 'Broken clouds',
    'temperature': 8.8,
    'date': '2021-03-09',
    'clouds': 66
  },
  {
    'zip_code': '97016',
    'city': 'Clatskanie',
    'state': 'OR',
    'distance': 48.307,
    'forecast': 'Broken clouds',
    'temperature': 10.2,
    'date': '2021-03-09',
    'clouds': 59
  },
  {
    'zip_code': '98609',
    'city': 'Carrolls',
    'state': 'WA',
    'distance': 38.822,
    'forecast': 'Broken clouds',
    'temperature': 10.3,
    'date': '2021-03-09',
    'clouds': 61
  },
  {
    'zip_code': '98626',
    'city': 'Kelso',
    'state': 'WA',
    'distance': 44.594,
    'forecast': 'Broken clouds',
    'temperature': 10.4,
    'date': '2021-03-09',
    'clouds': 58
  }
];

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

async function allWeather(uniqueCities, sortBy) {
  const mappedData = await Promise.all(uniqueCities.map(async ({ zip_code, city, state, distance }) => {
    const formattedWeather = await getWeather(zip_code);
    const {
      forecast,
      temperature,
      date,
      clouds
    } = formattedWeather;

    const tempFahrenheit = temperature * 9 / 5 + 32;
    
    return {
      zip_code,
      city,
      state,
      distance: Math.round(distance),
      forecast,
      temperature: Math.ceil(tempFahrenheit),
      date,
      clouds
    };
  }));
  return mappedData.filter(city => city.clouds <= 80)
    .sort((a, b) => a[sortBy] - b[sortBy]);
}

async function getWeather(zip_code) {
  const weatherItem = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&postal_code=${zip_code}`);

  const item = weatherItem.body.data[0];

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