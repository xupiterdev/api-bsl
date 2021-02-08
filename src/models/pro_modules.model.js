const mongoose = require('mongoose')

const Schema = mongoose.Schema

const modulus = new Schema({
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    icon: String,
    _Action: [{
        type: Schema.Types.ObjectId,
        ref: 'cat_actions'
    }],
    kind: {
        type: String,
        required: true,
        enum: ['Modulo', 'Sub', 'Sub Sub']
    },
    _Predecessor:{
        type: Schema.Types.ObjectId,
        ref: 'pro_modules'
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    }

})

const Modules = mongoose.model('pro_modules', modulus)

module.exports = Modules