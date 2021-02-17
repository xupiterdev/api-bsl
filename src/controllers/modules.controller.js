const ProModules = require('../models/pro_modules.model')
const CatActions = require('../models/cat_actions.model')
const Historics = require('./historicals.controller')
const  mongoose = require('mongoose')
const Area = "Modulos"

exports.add = async (req, res) => {
    const {name, shortName, type, _Module} = req.body
    const UserId = req._User

    let data = {name, shortName}

    try {
        if(type == "Sub") await ProModules.findByIdAndUpdate({_id : _Module},{ $push : { children : [data] } });
        else{
            let addModule = new ProModules(data);
            await addModule.save()
            added = `Agrego el modulo '${name}'`
        }

        let findModule = await ProModules.find()

        // historic({ _User : UserId, actions : [{ eventAction : added, area : Area }] })

        res.status(200).json({modules : findModule, msg : `El modulo ${name} se guardo con exito :)`})
    } catch (err) {
        console.log("Error in addModule ->", err)
    }
}

exports.addAction = async (req, res) => {
    const {name, description, _Module, type} = req.body;
    let data = {name, description}

    try{
        // let AddAction = new CatActions(data);
        // AddAction = await AddAction.save()
        // let added = `Agrego la accion ${data.name}`

        // if(type == "Sub"){
        //     let actionToModule = await ProModules.findOneAndUpdate({"children._id" : _Module},{ $push : { "children.$._Action" : AddAction._id } })
        //     added = `${added} en el submodulo ${actionToModule.name}`
        // }

        // let findModule = await ProModules.find().populate('cat_actions')

        // historic({
        //     _User : UserId,
        //     actions : [{
        //         eventAction : added,
        //         area : Area
        //     }]
        // })
        let AddAction = new CatActions(data);
        AddAction = await AddAction.save()

        if(type == undefined){await ProModules.findOneAndUpdate({_id : _Module},{ $push : { _Action : AddAction._id } });}
        if(type == "Sub") await ProModules.findOneAndUpdate({"children._id" : _Module},{ $push : { "children.$._Action" : AddAction._id } });

        let findModule = await ProModules.find().populate('_Action').populate('children._Action').exec()

        res.status(200).json({modules : findModule, msg : `La accion ${name} se guardo con exito :)`})
    }catch(err){
        console.log(err)
    }
}

exports.find = async (req, res) => {
    
    try {
        let modulesRes = await ProModules.find({}, {__v : 0}).populate('_Action').populate('children._Action').exec()

        if(modulesRes === null) return res.status(202).json({msg : `No hay ningun tipo de modulos`})

        res.status(200).json({modules : modulesRes})
    } catch (err) {
        console.log("Error in find ->", err)
    }
}

// The delete functions will utilice the update function, because just will be logical deletes.
exports.delete = async (req, res) => {
    const idModule = req.query._id
    const UserId = req._User

    try {
        let deletedModule = await ProModules.findByIdAndUpdate(idModule, { isActive : false }, { new : true })

        // historic({ _User : UserId, actions : [{ eventAction : `Borro el modulo '${deletedModule.typeof}'`, area : Area }] })

        res.status(200).json({msg : `El modulo ${deletedModule.typeof} se borro con exito`})
    } catch (err) {
        console.log("Error in delete ->", err)
    }
}

//Function to record the user actions
historic = async (toHistoric) => {
    await Historics.add(toHistoric)
}


