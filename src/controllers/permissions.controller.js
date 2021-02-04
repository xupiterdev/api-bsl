const RelPermissions = require('../models/rel_permissions.model')

exports.addPermission = async (req, res) => {
    const permission = req.body

    try {
        
        let perm = new RelPermissions(permission)

        perm.save()

        return res.status(200).json({msg : `Se añadio correctamente el permiso`})

    } catch (err) {
        console.log("Error in addPermission", err)
    }
}