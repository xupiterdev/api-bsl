const mongoose = require('mongoose')

const Schema = mongoose.Schema

const catalog = new Schema({
    typeof: {
        type: String,
        required: true
    },
    options: [{
        value: {
            type: String,
            required: true
        }
    }]
})

const Catalogs = mongoose.model('cat_catalogs', catalog)

module.exports = Catalogs
