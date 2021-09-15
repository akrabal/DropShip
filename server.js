// Requires
let express = require('express')
let body = require('body-parser')
let Router = require('./Router/Router')

//Uses && Variables
let app = express()


// Middlewares
app.use('/api/', Router)
app.use(body.urlencoded({extended: true}))
app.use(body.json())


// Listen
app.listen(3000)

app.get('/', (request, response) => {

    response.json({
        message: "Alert "
    })
})