const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    roomname:{
        type:String
    },
    usernumber:{
        type:Number
    },
    password:{
        type:String,
        default:""
    }
},{timestamps:true})
module.exports= mongoose.model('room',roomSchema)