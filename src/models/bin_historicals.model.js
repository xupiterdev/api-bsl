const mongoose = require('mongoose')

const Schema = mongoose.Schema

const historic = new Schema({
    _customerService: {
        type: Schema.Types.ObjectId,
        ref: 'pro_customer_services',
        required: true
    },
    historical: [{
        _User: {
            type: Schema.Types.ObjectId,
            ref: 'pro_users',
            required: true
        },
        action: {
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
        }
    }]
})

const Historics = mongoose.model('bin_historicals', historic)

module.exports = Historics