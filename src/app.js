const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//APP START
const app = express()
const port = process.env.PORT || 3000

//DEFINE PATH EPRESS CONFIG
const public_html = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//SETUP HANGLER BARS
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//STATIC APP
app.use(express.static(public_html));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Goodwill Feni'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Goodwill Feni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is the help page.',
        title: 'Help',
        name: 'Goodwill Feni'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)  
    {
        return res.send({
            error: 'Adddres is required!!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error})
        }
        
    forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
            return res.send({ error })
        }
            res.send({ 
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search.'
        })
    }

    console.log(req.query.search)
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Goodwill Feni',
        errorMessage: 'Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Goodwill Feni',
        errorMessage: 'Page Not found'
    })
})

//END ROUTES

//START SERVER
app.listen(port, () => {
    console.log('listening on port ' + port)
})
//END SERVER