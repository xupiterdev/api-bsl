const mongoose = require('mongoose')

const Schema = mongoose.Schema

const permission = new Schema({
    _User: {
        type: Schema.Types.ObjectId,
        ref: 'pro_users',
        required: true
    },
    _Action: [{
        type: Schema.Types.ObjectId,
        ref: 'cat_actions',
        required: true
    }]

})

const Permissions = mongoose.model('rel_permissions', permission)

module.exports = Permissions