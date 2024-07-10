const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({

        task_id:{
            type:Number,
            required: true
        },
        task_title:{
            type: String,
            required : true
        },
        task_description:{
            type: String,
            required : true
        },
        task_user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'EmpSchema'
        }

},{
    timestamps:true
})

module.exports = mongoose.model('TaskSchema',TaskSchema)