const mongoose = require("mongoose")

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type:String,
        minLength:4,
        unique:true,
        required:true
    },
    password:{
        type:String ,
        required:true
    },
    image:String,
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
})

let user = mongoose.model("user",UserSchema);

module.exports = user