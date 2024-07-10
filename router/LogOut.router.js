const express = require('express')
const router = express.Router()
const LogoutSchema = require('../models/LogoOut.model')

router.post('/api/logout/post', async (req, res) => {
    try {
        const logoutSchema = new LogoutSchema({
            User_id: req.body.User_id,
            Logout_hr: req.body.Logout_hr
        })
        const saveData = await logoutSchema.save()
        if (saveData) {
            return res.status(201).json({ message: "data created", data: saveData })
        }
        else {
            return res.status(400).json({ message: "data not created" })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

router.get('/api/logout/get', async (req, res) => {
    try {
        const getData = await LogoutSchema.find().populate('hr_user')
        if (getData) {
            return res.status(200).json({ message: "data found", data: getData })
        }
        else {
            return res.status(404).json({ message: "data not found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})


router.get('/api/logout/get/:id',async(req,res)=>{
    try {
        const getData = await LogoutSchema.find().populate('hr_user')
        if (getData) {
            return res.status(200).json({ message: "data found", data: getData })
        }
        else {
            return res.status(404).json({ message: "data not found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})


router.delete('/api/logout/delete',async(req,res)=>{
    try{    
        const deleteData = await LogoutSchema.deleteMany()
        if(deleteData){
            if(deleteData){
                return res.status(200).json({message:"data found",data:deleteData})
            }
            else{
                return res.status(404).json({message:"data not found"})
            }
        }
    }catch(error){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }

})

module.exports = router;