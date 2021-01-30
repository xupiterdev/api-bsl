const ProUsers = require('../models/pro_users.model');
const jwt = require('jsonwebtoken')

exports.singUp = async (req, res) => {
    const user = req.body;

    try{
        let proUser = new ProUsers(user)
        proUser.password = await proUser.encryptPassword(proUser.password)
    
        await proUser.save();

        return res.status(200).json({msg : `El usuario ${user.name} se guardo con exito :)`})
    }catch(err){
        console.log("Error in singUp -> ", err)
    }
}

exports.singIn = async (req, res) => {
    const {user, password} = req.body

    try{
        let userData = await ProUsers.findOne({user});

        if(userData === null) return res.status(404).json({msg : `El usuario ${user}, no  existe`})
        if(! await userData.validatePassword(password)) return res.status(404).json({msg : "Tu contraseña es incorrecta, intenta nuevamente"})
        
        let token = jwt.sign({
            _id : user._id
        }, "bsl", {
            expiresIn : 60 * 60 * 24
        })

        res.status(200).json({
            token,
            userData : {
                _id : userData.id,
                name : userData.name,
                lastname : userData.lastname,
                user : userData.user
            }
        })
    }catch(err){
        console.log("Error in singIn -> ",err)
    }
}