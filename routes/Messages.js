const express = require("express")
const Message = require('../models/Message')
const router = express.Router()
//get all messages
router.get('/', async(req,res)=>{
    try{
        const messages = await Message.find()
        res.json(messages)
    }catch(err){
        res.status(500).json({response: err.message})
    }
})
//get messages by room id
router.get('/room', async(req,res)=>{
    try{
        const messages = await Message.find({roomid:req.body.roomid}).sort({createdAt: 'asc'})
        res.json(messages)
    }catch(err){
        res.status(500).json({response: err.message})
    }
})
//add message
router.post('/',async (req,res)=>{
    const message = new Message({
        roomid:req.body.roomid,
        sender:req.body.sender,
        reciever:req.body.reciever,
        content:req.body.content
    })
    try{
        const newMessage = await message.save()
        res.status(201).json(newMessage)
    }catch(err){
        res.status(400)
    }
})
module.exports = router