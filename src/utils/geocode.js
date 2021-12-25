const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3JlZW5qZWFuMTk3MiIsImEiOiJja3dqNHBwODgwNjBnMnZwZHpscmEwdGZwIn0.3n4pj5QF7LrmtDe52MQNyw&limit=1'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Please try to write something else.', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[0],
                lon: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode