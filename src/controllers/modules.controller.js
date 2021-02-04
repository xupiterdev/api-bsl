const ProModules = require('../models/pro_modules.model')

exports.add = async (req, res) => {
    const module = req.body

    try {
        
        let mod = new ProModules(module)

        await mod.save();

        let find = ProModules.find()

        return res.status(200).json({modules : find, msg : `El modulo ${module.name} se guardo con exito :)`})

    } catch (err) {
        console.log("Error in addModule ->", err)
    }
}