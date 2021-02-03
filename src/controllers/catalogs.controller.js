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