require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/database.util');

const PORT = 3001

// DB
db()
// SERVER
const app = express()

// SET
app.set('PORT', process.env.PORT || PORT);

// CONFIG
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());

// ROUTES
app.use('/v1', require('./routes/get.route')) // GET
app.use('/v1', require('./routes/post.route')) // POST
app.use('/v1', require('./routes/delete.route')) // DELETE
app.use('/v1', require('./routes/put.route')) // PUT
app.use('/', (req, res) => {
    res.json({msg : "Welcome to BSL API"})
})

// START
app.listen(app.get('PORT'), () => console.log(`Server on PORT : ${app.get('PORT')}`))