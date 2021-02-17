require('dotenv').config()

const ProUsers = require('../models/pro_users.model');
const jwt = require('jsonwebtoken')
const Historics = require('./historicals.controller')

const API_KEY = process.env.API_KEY

exports.signUp = async (req, res) => {
    const user = req.body;
    const UserId = req._User

    try{
        let proUser = new ProUsers(user)
        proUser.password = await proUser.encryptPassword(proUser.password)
    
        await proUser.save();
        
        // historic({ _User : UserId, actions : [{ eventAction : `Agrego el usuario '${user.name}'`, area : "Usuarios" }] })


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

        // historic({ _User : userData._id, actions : [{ eventAction : `Inicio sesion el usuario '${userData.name}'`, area : "Pagina principal" }] })

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

exports.update = async (req, res) => {
    const user = req.body
    const UserId = req._User

    try {
        let updatedUser = ProUsers.findByIdAndUpdate(user._id,user.content, { new : true })

        // historic({ _User : UserId, actions : [{ eventAction : `Modifico un usuario`, area : Area }] })

        res.status(200).json({ updated : updatedUser, msg : `El usuario se modifico con exito`})
    } catch (err) {
        console.log("Error in update ->", err)
    }
}

//Function to record the user actions
historic = async (toHistoric) => {
    await Historics.add(toHistoric)
}