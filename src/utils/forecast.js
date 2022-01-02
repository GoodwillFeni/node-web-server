const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fa81e50787859beeb6f475bc3655a62e&query=' + latitude + ','+ longitude +'&units=m'
    request({url, json: true }, (error, { body }) => {
        if(error) {
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions +'. It is currently '+ body.current.temperature + ' degrese out. There is ' + body.current.precip + '% chance of rain')
        }
    })
}

module.exports = forecast