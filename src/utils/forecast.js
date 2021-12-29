const request = require("request")

const forecast = (lati, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2951d869660a5f7cce9344263e35e094&query=' + long + ',' + lati + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.location.localtime + ". " + response.body.location.name + " of " + response.body.location.region + ". Temperature is " + response.body.current.temperature + ". " + response.body.current.weather_descriptions[0] + ". Wind speed is " + response.body.current.wind_speed + ".")
        }
    })
}

module.exports = forecast