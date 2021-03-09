function formatWeather(weatherData) {
    //Map through the array of weather and return a new array with forecast and time only
    const formattedResponse = weatherData.data.map(weatherItem => {
        return {
            forecast: weatherItem.weather.description,
            temperature: weatherItem.app_max_temp,
            date: weatherItem.datetime,
            clouds: weatherItem.clouds
        };
    });
    //The final response should show 7 days of weather
    const finalResponse = formattedResponse.slice(0, 3);
    return finalResponse;
}

module.exports = {
    formatWeather,
};