const CatCatalogs = require('../models/cat_catalogs.model')

exports.addCat = async (req, res) => {
    const catalog = req.body

    try {
        let cat = new CatCatalogs(catalog)
        
        await cat.save();

        return res.status(200).json({msg : `El Catalogo ${catalog.typeof} y su contenido se guardo con exito :)`})

    } catch (err) {
        console.log(err);
    }
}

// exports.addOptionCat = async (req, res) => {

// }

exports.findCat = async (req, res) => {
    try {

        let catalogs = await CatCatalogs.find()

        if(catalogs === null) return res.status(202).json({msg : `No hay catalogos aun`})
        
        res.status(200).json(catalogs)
        
    } catch (err) {
        console.log(err)
    }
}

exports.findCatById = async (req, res) => {
    const catId = req.params.id
    
    try {
        
        let catalog = await CatCatalogs.findById(catId)

        if(catalog === null) return res.status(202).json({msg : `Ese catalogo no existe en la base de datos`})

        res.status(200).json(catalog)

    } catch (error) {
        
    }
}

