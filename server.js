// Requires
let express = require('express')
let bodyParser = require('body-parser')
let Router = require('./Router/Router')

//Uses && Variables
let app = express()


// Middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/', Router)


// Listen
app.listen(3000)

app.get('/', (request, response) => {

    response.json({
        message: "Alert "
    })
})