const CatCatalogs = require('../models/cat_catalogs.model')

exports.add = async (req, res) => {
    const catalog = req.body

    try {
        let addedCatalog = new CatCatalogs(catalog)
        
        await addedCatalog.save();

        return res.status(200).json({msg : `El catalogo ${catalog.typeof} y su contenido se guardo con exito :)`})

    } catch (err) {
        console.log("Error in add ->", err);
    }
}

exports.addOption = async (req, res) => {
    const catalog = req.body

    try {
        
        let addedOption = await CatCatalogs.findByIdAndUpdate(catalog._id, { $push : { options : [{ value : catalog.option}] } })

        if(addedOption === null) return res.status(202).json({msg : `El catalogo seleccionado no existe en la base de datos`})

        res.status(200).json({msg : `La opcion ${catalog.option} se guardo correctamente`})

    } catch (error) {
        console.log("Error in addOption ->", err)
    }
}

exports.find = async (req, res) => {
    try {

        let findedCatalog = await CatCatalogs.find()

        if(findedCatalog === null) return res.status(202).json({msg : `No hay catalogos aun`})
        
        res.status(200).json(findedCatalog)
        
    } catch (err) {
        console.log("Error in find ->" ,err)
    }
}

exports.findById = async (req, res) => {
    const catalogId = req.query._id
    
    try {
        
        let findedCatalog = await CatCatalogs.findById(catalogId)

        if(findedCatalog === null) return res.status(202).json({msg : `Ese catalogo no existe en la base de datos`})

        res.status(200).json(findedCatalog)

    } catch (error) {
        console.log("Error in findById ->" ,err)
    }
}

exports.updTypeof = async (req, res) => {
    const catalog = req.body

    try {

        let updatedCatalog = await CatCatalogs.updateTypeof(catalog._id,catalog.typeof)

        res.status(200).json(updatedCatalog)
 
    } catch (err) {
        console.log("Error in updTypeof ->", err)
    }
}

exports.updOption = async (req, res) => {
    const option = req.body

    try {
        
        let updatedOption = await CatCatalogs.findOneAndUpdate({"options._id" : option._id}, { "options.$.value" : option.value }, { new : true })

        return res.status(200).json({msg: `La opcion se actualizo con exito :)`})

    } catch (err) {
        console.log("Error in updOption ->", err)
    }
}

// The delete functions will utilice the update function, because just will be logical deletes.
exports.del = async (req, res) => {
    const catalogId = req.query._id

    try {
        let deletedCatalog = await CatCatalogs.deleteOne({"_id" : catalogId})// aun no esta listas

        console.log(deletedCatalog)

        res.status(200).json({msg : `El catalogo se borro con exito`})

    } catch (err) {
        console.log("Error in del ->", err)
    }
}

exports.delOption = async (req, res) => {
    const optionId = req.query._id

    try {
        let deletedOption = await CatCatalogs.updateOne( {"options._id" : optionId})// aun no esta listas

        console.log(deletedOption)

        res.status(200).json({msg : `La opcion se borro con exito`})

    } catch (err) {
        console.log("Error in delOption ->", err)
    }
}