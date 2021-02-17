const ProCustomerServices = require('../models/pro_customer_services.model')
const Historics = require('./historicals.controller')
const Area = "Atencion al cliente"

exports.add = async (req, res) => {
    const referenceBody = req.body
    const UserId = req._User

    try {
        let newReference = new ProCustomerServices(referenceBody)
        let addedReference = await newReference.save()

        historic({_User : UserId, actions : [{ eventAction : `Agrego la referencia '${addedReference.reference}'`, area : Area }] })

        return res.status(200).json({msg : `La referencia ${addedReference.reference} se guardo con exito :)`})
    } catch (err) {
        console.log("Error in add ->", err)
    }
}

exports.find = async (req, res) => {
    const referenceId = req.query._id

    try {
        let findedReference
        if (referenceId === undefined ) {
            findedReference = await ProCustomerServices.find()

            if(findedReference === null) return res.status(202).json({ msg : `No hay referencias aun`})
        }else{
            findedReference = await ProCustomerServices.findById(referenceId)

            if(findedReference === null) return res.status(202).json({ msg : `Esa referencia no existe en la base de datos`})
        }

        res.status(200).json({ references : findedReference }) 
    } catch (err) {
        console.log("Error in find ->", err)
    }
}

//Function to record the user actions
historic = async (toHistoric) => {
    await Historics.add(toHistoric)
}