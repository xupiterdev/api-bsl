const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerS = new Schema({
    reference: {
        type: String
    },
    _CatClient: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs'
    },
    documentsReception: {
        type: Date
    },
    _CatTypeOperation: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs'
    },
    _CatTypeMerchandise: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs'
    },
    _CatLogisticOperator: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs'
    },
    _CatCommercialOffice: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs'
    },
    container: {
        type: String
    },
    clientReference: {
        type: String
    },
    BM: {
        type: String
    },
    _CatShipowner: {
        type: Schema.Types.ObjectId,
        ref: 'cat_catalogs'
    },
    BL: [{
        type: String
    }],
    portOfOrigin: {
        type: String
    },
    seaFreight: {
        type: String
    },
    _Executive: {
        type: Schema.Types.ObjectId,
        ref: 'pro_users'
    }

})

const CustomerServices = mongoose.model('pro_customer_services', customerS)

module.exports = CustomerServices