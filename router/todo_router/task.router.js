const express = require('express')
const router = express.Router()
const TaskSchema = require('../../models/todo_model/task.model')
const middleware = require('../../middleware')
const EmpSchema = require('../emp_router/emp.router')

router.get('/api/get/task', middleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await TaskSchema.find({ task_user_id: userId });

        if (tasks.length > 0) {
            return res.status(200).json({ message: "Tasks found", data: tasks });
        } else {
            return res.status(404).json({ message: "No tasks found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post('/api/post/task', middleware, async (req, res) => {
    try {
        const { task_id, task_title, task_description } = req.body;
        const newTask = new TaskSchema({
            task_id,
            task_title,
            task_description,
            task_user_id: req.user.id
        });

        const saveData = await newTask.save();
        return res.status(201).json({ message: "Task created", data: saveData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/api/get/task/:id', middleware, async (req, res) => {
    try {
        const getData = await TaskSchema.findById(req.params.id).populate('task_user_id');

        if (!getData) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        if (getData.length > 0) {
            return res.status(200).json({ message: "Tasks found", data: getData });
        } else {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server Error" });
    }
});


router.put('/api/update/task/:id', middleware, async (req, res) => {
    try {
        const updateData = await TaskSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

router.delete('/api/delete/task', middleware, async (req, res) => {
    try {
        const deleteData = await TaskSchema.deleteMany()
        if (deleteData) {
            return res.status(200).json({ message: "data deleted", data: deleteData })
        }
        else {
            return res.status(400).json({ message: "data was not deleted" })
        }
    } catch (err) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error" })
    }
})

module.exports = router