const path = require('path')
var hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
// app.set('view engine','hbs')

// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);
app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
// hbs.registerPartial('headPartial', 'header'); 

app.use(express.static(publicDirectoryPath))



app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Harsh Verma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Harsh sahdev'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'this is somehelpful text',
        title: 'Help',
        name: 'Harsh sahdev'
    })
})

// app.get('/weather', (req, res) => {
//     if(!req.query.address){
//         return res.send({
//             error:'you must provide an address!'
//         })
//     }

//    geocode(req.query.address,(error,{latitude,longitude,location}) =>{
//        if(error) {
//            return res.send({error})
//        }

//        forecast(latitude, longitude, (error,forecastData )=>{
//         if (error){
//             return res.send({error})
//         }
//        res.send({
//            forecast:forecastData,
//            location,
//            address:req.query.address
//        })

//        })
//    })







//     // res.send({
//     //     forecast: 'cold',
//     //     location: 'delhi',
//     //     address:req.query.address
//     // })
// })



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


// app.get('/products', (req, res) => {

//     res.send({ 

//         products: []
//     })
// })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harsh Verma',
        errorMessage: 'Help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harsh',
        errorMessage: 'page not found'

    })
})

app.listen(port, () => {
    console.log('server is on' + port)
})
// const path = require('path')
// const express = require('express')

// const app = express()
// const publicDirectoryPath = path.join(__dirname, '../public')

// app.set('view engine', 'hbs')
// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'Andrew Mead'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Andrew Mead'
//     })
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helpText: 'This is some helpful text.'
//     })
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })




// // console.log(__dirname) these are the some 
// // features of node 
// // console.log(path.join(__dirname,'../about'))
// //   app.com if we make any kind if 
// // app.com/help
// // app.com/about 

// // app.get('',(req,res) =>{
// // res.send('<h1>hey parth kya chate ho tum</h1>')
// // }) i used these things only one time only for the test