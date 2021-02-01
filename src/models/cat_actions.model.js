const mongoose = require('mongoose')

const Schema = mongoose.Schema

const action = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Actions = mongoose.model('cat_actions', action)

module.exports = Actions