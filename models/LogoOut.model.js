const mongoose = require('mongoose')

const LogOutSchema = new mongoose.Schema({
    User_id:{
        type: String,
        required: true
    },
    Logout_hr:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HrSchema'
    }
},{
    timestamps: true
})


module.exports = mongoose.model('LogOutSchema',LogOutSchema)