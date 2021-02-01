const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerS = new Schema({
    reference: {
        type: String,
        required: true
    },
    _CatClient: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs',
        required: true
    },
    documentsReception: {
        type: Date,
        required: true
    },
    _CatTypeOperation: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs',
        required: true
    },
    _typeMerchandise: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs',
        required: true
    },
    _CatLogisticOperator: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs',
        required: true
    },
    _CatCommercialOffice: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs',
        required: true
    },
    container: {
        type: String,
        required: true
    },
    containerReference: {
        type: String,
        required: true
    },
    BM: {
        type: String,
        required: true
    },
    _CatShipowner: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs',
        required: true
    },
    BL: [{
        type: String,
        required: true
    }],
    portOfOrigin: {
        type: String,
        required: true
    },
    seaFreight: {
        type: String,
        required: true
    },
    _Executive: {
        type: Schema.Types.ObjectId,
        ref: 'pro_users',
        required: true
    }

})

const CustomerServices = mongoose.model('pro_customer_services', customerS)

module.exports = CustomerServices