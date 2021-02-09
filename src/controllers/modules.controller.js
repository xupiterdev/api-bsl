const ProModules = require('../models/pro_modules.model')
const CatActions = require('../models/cat_actions.model')

exports.add = async (req, res) => {
    const {name, shortName, type, _Module} = req.body

    let data = {name,shortName}

    try {

        if(type == "Sub") await ProModules.findByIdAndUpdate({_id : _Module},{ $push : { children : [data] } });
        else{
            let addModule = new ProModules(module);
            await addModule.save()
        }

        let findModule = await ProModules.find()
        res.status(200).json({modules : findModule, msg : `El modulo ${name} se guardo con exito :)`})

    } catch (err) {
        console.log("Error in addModule ->", err)
    }
}

exports.addAction = async (req, res) => {
    const {name, description, _Module, type} = req.body;
    let data = {name, description}

    try{

        let AddAction = new CatActions(data);
        AddAction = await AddAction.save()

        if(type == "Sub") await ProModules.findOneAndUpdate({"children._id" : _Module},{ $push : { "children.$._Action" : AddAction._id } });

        let findModule = await ProModules.find().populate('cat_actions')

        res.status(200).json({modules : findModule, msg : `La accion ${name} se guardo con exito :)`})
    }catch(err){
        console.log(err)
    }
}

exports.find = async (req, res) => {
    try {
        let modulesRes = await ProModules.find({}, {__v : 0}).populate('children._Action').exec()

        if(modulesRes === null) return res.status(202).json({msg : `No hay ningun tipo de modulos`})

        res.status(200).json({modules : modulesRes})


    } catch (err) {
        console.log("Error in find ->", err)
    }
}


