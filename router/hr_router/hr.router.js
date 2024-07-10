const express = require('express')
const router = express.Router()
const HrSchema = require('../../models/hr_models/hr.model')
const middleware = require('../../middleware')

router.post('/api/hr/post',middleware, async (req, res) => {

    const Hrdata = new HrSchema({
        hr_id: req.body.hr_id,
        hr_name: req.body.hr_name,
        hr_department: req.body.hr_department,
        hr_phonenumber: req.body.hr_phonenumber,
        hr_user: req.user.id

    })
    const saveData = await Hrdata.save()
    if (saveData) {
        return res.status(201).json({ message: "data created", data: saveData })
    }
    else{
        return res.status(400).json({message:"data not created"})
    }
})

router.get('/api/hr/get',middleware, async (req, res) => {
    try {
        const getData = await HrSchema.find().populate('hr_user')
        if (getData) {
            return res.status(200).json({ message: "data found", data: getData })
        }
        else {
            return res.status(404).json({ message: "data not found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server Error" })
    }
})

router.get('/api/hr/get/:id', middleware,async (req, res) => {
    try {
        const getData = await HrSchema.findById(req.params.id).populate('hr_user')
        if (getData) {
            return res.status(200).json({ message: "data was found", data: getData })
        }
        else {
            return res.status(404).json({ message: "data not found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server Error" })
    }
})


router.put('/api/update/hr/:id', async (req, res) => {
    try {
        const updateData = await HrSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (updateData) {
            return res.status(200).json({ message: "data updated", data: updateData })
        }
        else {
            return res.status(404).json({ message: "data not updated" })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server Error" })
    }
})



router.delete('/api/delete/hr/:id', async (req, res) => {
    try {
        const deleteData = await HrSchema.findById(req.params.id)
        if (deleteData) {
            return res.status(200).json({ message: "data deleted", data: deleteData })
        }
        else {
            return res.status(400).json({ message: "data was not deleted" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server Error"})
    }
})


router.delete('/api/delete/hr', async (req, res) => {
    try {
        const deletData = await HrSchema.deleteMany()
        if (deletData) {
            return res.status(200).json({ message: "data deleted", data: deletData })
        }
        else {
            return res.status(400).json({ message: "data was not deleted" })
        }
    } catch (err) {
        console.log(error)
        return res.status(500).json({message:"Internal server Error"})
    }
})


module.exports = router