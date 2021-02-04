const ProModules = require('../models/pro_modules.model')

exports.add = async (req, res) => {
    const module = req.body

    try {
        
        let mod = new ProModules(module)

        await mod.save();

        return res.status(200).json({msg : `El modulo ${module.name} se guardo con exito :)`})

    } catch (err) {
        console.log("Error in addModule ->", err)
    }
}