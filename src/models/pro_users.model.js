const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const schema = new Schema({
    name : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    jobPosition : {
        type : String,
        required : true,
        enum : ["Jefe de area", "Ejecutivo"],
    },
    user : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

schema.methods.encryptPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(15);
        return bcrypt.hash(password, salt);
    }catch(err){
        console.log("Error in encryptPassword -> ",err)
    }
}

schema.methods.validatePassword = function (password){
    return bcrypt.compare(password, this.password);
}

const model = mongoose.model('pro_users', schema);
module.exports = model;