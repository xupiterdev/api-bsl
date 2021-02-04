const ProModules = require('../models/pro_modules.model')

exports.add = async (req, res) => {
    const module = req.body

    try {
        
        let mod = new ProModules(module)

        await mod.save();

        let find = await ProModules.find()

        return res.status(200).json({modules : find, msg : `El modulo ${module.name} se guardo con exito :)`})

    } catch (err) {
        console.log("Error in add ->", err)
    }
}

exports.find = async (req, res) => {
    const content = req.query

    try {

        let find

        if (content !== null) {

            find = await ProModules.findById(content._id)

            if(find === null) return res.status(202).json({msg : `Ese modulo no existe en la base de datos`})

        }else {
            
            find = await ProModules.find()
            
            if(find === null) return res.status(202).json({msg : `No hay ningun tipo de modulos`})
        }

        res.status(200).json({modules : find})

    } catch (err) {
        console.log("Error in find ->", err)
    }
}