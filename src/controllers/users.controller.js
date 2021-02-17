require('dotenv').config()

const ProUsers = require('../models/pro_users.model');
const jwt = require('jsonwebtoken')
const Area = "Usuarios";

const API_KEY = process.env.API_KEY

exports.signUp = async (req, res) => {
    const user = req.body;

    try{
        let proUser = new ProUsers(user)
        proUser.password = await proUser.encryptPassword(proUser.password)
    
        await proUser.save();

        // let toHistoric = {
        //     _User : UserId,
        //     actions : [{
        //         eventAction : `Agrego el usuario '${user.name}'`,
        //         area : Area
        //     }]
        // }

        // await Historics.add(toHistoric)

        return res.status(200).json({msg : `El usuario ${user.name} se guardo con exito :)`})
    }catch(err){
        console.log("Error in singUp -> ", err)
    }
}

exports.signIn = async (req, res) => {
    const {user, password} = req.body

    try{
        let userData = await ProUsers.findOne({user});
        
        if(userData === null) return res.status(202).json({msg : `El usuario ${user}, no  existe`})
        if(! await userData.validatePassword(password)) return res.status(202).json({msg : "Tu contraseña es incorrecta, intenta nuevamente"})
        
        let token = jwt.sign({
            _id : userData._id
        }, API_KEY, {
            expiresIn : 60 * 60 * 24
        })

        res.status(200).json({
            token,
            userData : {
                _id : userData._id,
                name : userData.name,
                lastname : userData.lastname,
                user : userData.user,
                _Action: userData._Action
            },
            msg: `Bienvenido, ${userData.name}`
        })
    }catch(err){
        console.log("Error in singIn -> ",err)
    }
}