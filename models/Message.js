const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    roomid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    },
    sender:{
        type:String
    },
    reciever:{
        type:String
    },
    content:{
        type:String
    },

},{timestamps:true})
module.exports = mongoose.model('message',messageSchema)