require('dotenv').config()

const mongoose = require('mongoose')
const DB_API = process.env.DATABASE_API_LOCAL

module.exports = () => {
    mongoose.connect(DB_API, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true,
        useFindAndModify : false
    })
    .then(() => console.log(`MongoDB Connected! on ${DB_API}`))
    .catch(err => console.log(`Error un database.js -> ${err}`))

    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log("I see you in the other side ...")
            process.exit(0)
        })
    })
}