const mongoose = require('mongosee')

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
        ref: 'cat_actions',
        required: true
    }],
    kind: {
        type: String,
        required: true,
        enum: ['Modulo', 'Sub', 'Sub Sub']
    },
    _Predecessor:{
        type: Schema.Types.ObjectId,
        ref: 'pro_modules',
        required: true
    }

})

const Modules = mongoose.model('pro_modules', modulus)

module.exports = Modules