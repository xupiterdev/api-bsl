const ProModules = require('../models/pro_modules.model')
const mongoose = require('mongoose')

exports.add = async (req, res) => {
    const module = req.body

    try {
        
        let mod = new ProModules(module)

        await mod.save();

        let find = await ProModules.find()

        let modules = formatModules(find)

        res.status(200).json({modules, msg : `El modulo ${module.name} se guardo con exito :)`})

    } catch (err) {
        console.log("Error in addModule ->", err)
    }
}

exports.find = async (req, res) => {
    try {

        let modulesRes = await ProModules.find({}, {__v : 0})

        if(modulesRes === null) return res.status(202).json({msg : `No hay ningun tipo de modulos`})

        let modules = formatModules(modulesRes)

        res.status(200).json({modules})

    } catch (err) {
        console.log("Error in find ->", err)
    }
}

function formatModules(modulesRes){
    let modules = modulesRes.filter(module => module.kind === "Modulo")
    let subModules = modulesRes.filter(module => module.kind === "Sub")
    let subSubModules = modulesRes.filter(module => module.kind === "Sub Sub")

    return modules.map(module => {

        var g = {
            _id : module._id,
            name : module.name,
            shorName : module.shortName,
            icon : module.icon,
            kind : module.kind,
            _Action : module._Action,
            sub : []
        }

        g.sub = subModules.map(sub => {
            if(sub._Predecessor.equals(module._id)){
                let s = {
                    _id : sub._id,
                    name : sub.name,
                    shorName : sub.shortName,
                    kind : sub.kind,
                    _Action : sub._Action,
                    subSub : []
                }

                s.subSub = subSubModules.map(subSub => {
                    if(subSub._Predecessor.equals(sub._id)){
                        return {
                            _id : subSub._id,
                            name : subSub.name,
                            shorName : subSub.shortName,
                            kind : subSub.kind,
                            _Action : subSub._Action,
                        }
                    }
                })
                return s;
            }
        })

        return g;
    })
}