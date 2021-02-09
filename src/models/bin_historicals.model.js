const mongoose = require('mongoose')

const Schema = mongoose.Schema

const historic = new Schema({
    _User: {
        type: Schema.Types.ObjectId,
        ref: 'pro_users',
        required: true
    },
    actions: [{
        eventAction: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },
        registry: {
            type: Date,
            default: Date.now,
            required: true
        },
        current:{
            type: String
        },
        last:{
            type: String
        }
        
    }]
})

const Historics = mongoose.model('bin_historicals', historic)

module.exports = Historics