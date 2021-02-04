const CatActions = require('../models/cat_actions.model')

exports.add = async (req, res) => {
    const action = req.body

    try {
        let act = new CatActions(action)

        await act.save()

        return res.status(200).json({msg : `La accion ${action.name} se guardo con exito :)`})

    } catch (err) {
        console.log("Error in add->", err)
    }
}