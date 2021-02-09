require('dotenv').config()

const jwt = require('jsonwebtoken')

const API_KEY = process.env.API_KEY

exports.validateToken= (req, res, next) => {
    const bearerHeader = req.headers["authorization"]

    if(typeof(bearerHeader) !== 'undefined') {
        const bearer = bearerHeader.split(" ")

        let token = bearer[1]

        try {
            let dataToken = jwt.verify(token, API_KEY)
            req._User = dataToken._id
            next()
        } catch (err) {
            res.status(403).json({msg : `El token es incorrecto. Inicia sesion nuevamente`})
        }
    }else res.status(403).json({msg : `El token es incorrecto. Inicia sesion nuevamente`})
}