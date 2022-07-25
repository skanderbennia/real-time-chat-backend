const express = require("express")
const Room = require('../models/Room')
const router = express.Router()
//get all rooms
router.get('/', async(req,res)=>{
    try{
        const rooms = await Room.find()
        res.json(rooms)
    }catch(err){
        res.status(500).json({response: err.message})
    }
})
//add room
router.post('/',async (req,res)=>{
    const room = new Room({
        roomname:req.body.roomname,
        usernumber:req.body.usernumber,
        password:req.body.password
    })
    try{
        const newRoom = await room.save()
        res.status(201).json(newRoom)
    }catch(err){
        res.status(400)
    }
})
module.exports = router