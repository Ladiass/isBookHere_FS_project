const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema  = new Schema({
    orderId:{
        type:String,
        required:true,
        unique:true
    },
    buyer:{
        type :String,
        required:true,
    },
    track:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default: new Date()
    }
})

const payment = mongoose.model("payment",paymentSchema);;

module.exports = payment;