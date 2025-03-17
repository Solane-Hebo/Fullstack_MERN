//app.js ska hantera route
import express from 'express'

import newsRoute from './routes/news.route.js'
import { errorHandler, notFound } from './middleware/error.middelware.js'


const app = express()

// app.use(express.json()); // För att hantera JSON-data i POST-request

// CRAD function
//MVC

//istället att använda de har så har kan vi importera från router så alla methoden som är get, post, delete osv ska kommer in i routen//medelware
// vi flytter alla de här
// app.get('/api/news',(req, res) => {
//     res.send('Alla nyheter')
// })
// app.get('/api/news/:id',(req, res) => {
//     res.send('hämta en nyhet')
// })
// app.post('/api/news',(req, res) => {
//     res.send('Skapa nyheter')
// })

// app.use(express.urlencoded({extended: false})) // vi kan använda den när vi skicker data i form-data
// inbygda medelwere // den här kommer att låtta os att skicka en body
app.use(express.json())


app.use('/api/news', newsRoute)


// egna midelware och flytter den i enen fil
// app.use((err, req, res, next) => {
    
    // })
    app.use (notFound) // notFoud
    app.use (errorHandler) // errorHandler

// medelwere
// app.get('/', (req, res, next) => {
// console.log('first')
// next()
// }, (req, res, next) =>{
// console.log('Second')
// next()
// },(req, res) =>{
//     console.log('Third')
//     res.send('Färdig')

// })


//loga in
// app.post('/api/auth/login')
// app.post('/api/auth/register')

export default app