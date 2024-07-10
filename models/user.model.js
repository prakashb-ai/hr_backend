const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    phonenumber:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    confirmpassword:{
        type:String,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("UserSchema",UserSchema)