const CatCatalogs = require('../models/cat_catalogs.model')

exports.addCatalog = async (req, res) => {
    const catalog = req.body

    try {
        let cat = new CatCatalogs(catalog)
        
        await cat.save();

        return res.status(200).json({msg : `El catalogo ${catalog.typeof} y su contenido se guardo con exito :)`})

    } catch (err) {
        console.log("Error in addCatalog ->", err);
    }
}

exports.addOptionCatalog = async (req, res) => {
    const cat = req.body

    try {
        
        let catalogs = await CatCatalogs.findByIdAndUpdate(cat._id, { $push : { options : [{ value : cat.option}] } })

        if(catalogs === null) return res.status(202).json({msg : `El catalogo seleccionado no existe en la base de datos`})

        res.status(200).json({msg : `La opcion ${cat.option} se guardo correctamente`})

    } catch (error) {
        console.log("Error in addOptionCatalog ->", err)
    }
}

exports.findCatalog = async (req, res) => {
    try {

        let catalogs = await CatCatalogs.find()

        if(catalogs === null) return res.status(202).json({msg : `No hay catalogos aun`})
        
        res.status(200).json(catalogs)
        
    } catch (err) {
        console.log("Error in findCatalog ->" ,err)
    }
}

exports.findCatalogById = async (req, res) => {
    const catId = req.params.id

    console.log(catId)
    
    try {
        
        let catalog = await CatCatalogs.findById(catId)

        if(catalog === null) return res.status(202).json({msg : `Ese catalogo no existe en la base de datos`})

        res.status(200).json(catalog)

    } catch (error) {
        console.log("Error in findCatalogById ->" ,err)
    }
}

exports.updCatalog = async (req, res) => {
    const catId = req.params.id
    const catalog = req.body

    try {

        let cat = await CatCatalogs.findByIdAndUpdate(catId, catalog)

        console.log(cat)

        if(cat === null) return res.status(202).json({msg : `El catalogo al que se quiere modificart no existe en la base de datos`})
 
    } catch (err) {
        console.log("Error in updCatalog ->", err)
    }
}

// exports.updOptionCatalog = async (req, res) => {
//     const catId = req.params.id
//     const option = req.body

//     try {
        
//         let opt = await CatCatalogs.findByIdAndUpdate(catId, { $push : { options : [{ value : cat.option}] } })

//     } catch (err) {
//         console.log("Error in updOption ->", err)
//     }
// }

