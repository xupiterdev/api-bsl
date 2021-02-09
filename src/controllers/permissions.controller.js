// const RelPermissions = require('../models/rel_permissions.model')

exports.add = async (req, res) => {
    const permission = req.body

    try {
        
        let perm = new RelPermissions(permission)

         await perm.save()

        return res.status(200).json({msg : `El permiso se agrego con exito :)`})

    } catch (err) {
        console.log("Error in add", err)
    }
}