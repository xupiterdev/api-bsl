const { json } = require('express')
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

catalog.statics.updateTypeof = async function(_id, typeOf) {
    try {
        let upd = await this.findByIdAndUpdate(_id, { typeof : typeOf })
        
        if(upd === null) return res.status(202).json({msg : `El catalogo al que se quiere modificar no existe en la base de datos`})
        
        let find = await this.findById(upd._id, { __v : 0})

        return({catalog : find, msg : `El campo '${upd.typeof}' se actualizo a '${typeOf}' con exito :)`})

    } catch (err) {
        console.log("Error in updateTypeof ->", err)
    }
}

const Catalogs = mongoose.model('cat_catalogs', catalog)

module.exports = Catalogs
