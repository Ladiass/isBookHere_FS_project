const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    price: Number,
    quantity: Number,
    description:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    author: {
        type: String,
        required:true
    },
    CreateAt:{
        type:Date,
        default: new Date()
    },
    isActive:{
        type:Boolean,
        default: true
    }
})

let book = mongoose.model("book",bookSchema);

module.exports = book;