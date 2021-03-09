const request = require('superagent');
//Moved this functionality to the sunshine endpoint
// function formatWeather(weatherData) {
//     //Map through the array of weather and return a new array with forecast and time only
//     const formattedResponse = weatherData.data.map(weatherItem => {
//         return {
//             forecast: weatherItem.weather.description,
//             temperature: weatherItem.app_max_temp,
//             date: weatherItem.datetime,
//             clouds: weatherItem.clouds
//         };
//     });
//The final response should show 7 days of weather
// const finalResponse = formattedResponse.slice(0, 3);
// return finalResponse;
// }

function uniqueCityArr(zipCodeData) {
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

    return uniqueCity;
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
    uniqueCityArr,
    getWeather,
};