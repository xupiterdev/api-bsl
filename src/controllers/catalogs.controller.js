const CatCatalogs = require('../models/cat_catalogs.model')
const Historics = require('./historicals.controller')
const Area = "Catalogos"
// const UserId = "601b04b76cc9212c74b1f984" //Quitar para hacerlo automatico

exports.add = async (req, res) => {
    const catalog = req.body
    const UserId = req._User

    try {
        let newCatalog = new CatCatalogs(catalog)    
        let addedCatalog = await newCatalog.save()

        // historic({_User : UserId, actions : [{ eventAction : `Agrego el catalogo '${addedCatalog.typeof}'`, area : Area }] })

        return res.status(200).json({msg : `El catalogo ${addedCatalog.typeof} y su contenido se guardo con exito :)`})
    } catch (err) {
        console.log("Error in add ->", err);
    }
}

exports.addOption = async (req, res) => {
    const catalog = req.body
    const UserId = req._User

    try {
        let addedOption = await CatCatalogs.findByIdAndUpdate(catalog._id, { $push : { options : [{ value : catalog.option}] } })

        if(addedOption === null) return res.status(202).json({msg : `El catalogo seleccionado no existe en la base de datos`})

        // historic({ _User : UserId, actions : [{ eventAction : `Agrego una opcion al catalogo '${addedOption.typeof}'`, area : Area }] })

        res.status(200).json({msg : `La opcion ${catalog.option} se guardo correctamente`})
    } catch (error) {
        console.log("Error in addOption ->", err)
    }
}

exports.find = async (req, res) => {
    const catalogId = req.query._id

    try {
        let findedCatalog
        if (catalogId === undefined) {          
            findedCatalog = await CatCatalogs.find()

            if(findedCatalog === null) return res.status(202).json({msg : `No hay catalogos aun`})
        }else{
            findedCatalog = await CatCatalogs.findById(catalogId)

            if(findedCatalog === null) return res.status(202).json({msg : `Ese catalogo no existe en la base de datos`})
        }

        res.status(200).json({ catalogs : findedCatalog})      
    } catch (err) {
        console.log("Error in find ->" ,err)
    }
}

exports.updTypeof = async (req, res) => {
    const catalog = req.body
    const UserId = req._User

    try {
        let updatedCatalog = await CatCatalogs.updateTypeof(catalog._id,catalog.typeof)

        // historic({ _User : UserId, actions : [{ eventAction : `Modifico un catalogo`, area : Area, current : updatedCatalog.catalog.typeof, last : updatedCatalog.last }] })

        res.status(200).json({ updated : updatedCatalog.catalog, msg : `El catalogo se modifico de ${updatedCatalog.last} a ${updatedCatalog.catalog.typeof}`})
    } catch (err) {
        console.log("Error in updTypeof ->", err)
    }
}

exports.updOption = async (req, res) => {
    const option = req.body
    const UserId = req._User

    try {    
        let updatedOption = await CatCatalogs.findOneAndUpdate({"options._id" : option._id}, { "options.$.value" : option.value })

        let changed = updatedOption.options.find(x => x._id.equals(option._id))

        // historic({ _User : UserId, actions : [{ eventAction : `Modifico una opcion del catalogo '${updatedOption.typeof}'`, area : Area, current: option.value, last: changed.value }] })

        return res.status(200).json({msg: `La opcion se actualizo de ${changed.value} a ${option.value} con exito :)`})
    } catch (err) {
        console.log("Error in updOption ->", err)
    }
}

// The delete functions will utilice the update function, because just will be logical deletes.
exports.delete = async (req, res) => {
    const catalogId = req.query._id
    const UserId = req._User

    try {
        let deletedCatalog = await CatCatalogs.findByIdAndUpdate(catalogId, { isActive : false }, { new : true })

        // historic({ _User : UserId, actions : [{ eventAction : `Borro el catalogo '${deletedCatalog.typeof}'`, area : Area }] })

        res.status(200).json({msg : `El catalogo ${deletedCatalog.typeof} se borro con exito`})
    } catch (err) {
        console.log("Error in delete ->", err)
    }
}

exports.deleteOption = async (req, res) => {
    const optionId = req.query._id
    const UserId = req._User

    try {
        let deletedOption = await CatCatalogs.findOneAndUpdate({"options._id" : optionId}, { "options.$.isActive" : false }, { new : true })

        let changed = deletedOption.options.find(x => x._id.equals(optionId))

        // historic({ _User : UserId, actions : [{ eventAction : `Borro el catalogo '${deletedCatalog.typeof}'`, area : Area }] })

        res.status(200).json({msg : `La opcion ${changed.value} se borro con exito`})
    } catch (err) {
        console.log("Error in deleteOption ->", err)
    }
}

//Function to record the user actions
historic = async (toHistoric) => {
    await Historics.add(toHistoric)
}