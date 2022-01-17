const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        main: 'Weather forecast',
        name: 'Stas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        main: 'Weather forecast',
        name: 'Stas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        main: 'Weather forecast',
        helpText: 'In order to find out the weather forecast in the place you are interested in, enter it in the field "Locations".',
        name: 'Stas'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(data.lat, data.lon, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
            
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})