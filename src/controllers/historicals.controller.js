const BinHistoricals = require('../models/bin_historicals.model')
const moment = require('moment')
moment.locale("es")

exports.add = async (content) => { 

    try {

        let findedHistorical = await BinHistoricals.findOne({"_User" : content._User})

        let historic

        if (findedHistorical == null) {

            historic = new BinHistoricals(content)

            await historic.save()

        }else{

            historic = await BinHistoricals.findByIdAndUpdate(findedHistorical._id, { $push : { actions : content.actions }})

        }

        return(true)

    } catch (err){
        console.log("Error in add ->", err)
    }
}

exports.find = async (req, res) => {
    const UserId = req.query._id

    try {
        
        let findedHistorical = await BinHistoricals.findOne({"_User" : UserId})

        let ordered = ordering(findedHistorical)
        
        res.status(200).json(ordered)

    } catch (err) {
        console.log("Error in find ->", err)
    }
}

function ordering(historic){

    return historic.actions.map(historical => {
        const dateRegistry = moment(historical.registry)
        var days = dateRegistry.format("dddd, D")
        var month = dateRegistry.format("MMMM")
        var year = dateRegistry.format("YYYY")
        var time = dateRegistry.format("h:mm a")
        var customDate = `${days} de ${month} del ${year} a las ${time}`
        var changeCase = historical.current !== undefined ? `, de '${historical.last}' a '${historical.current}'` : ''

        return content = {
            action: `${historical.eventAction} en el area de ${historical.area}${changeCase}`,
            date: customDate
        }
    })

}
