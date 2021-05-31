const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    }
})

const seller = mongoose.model("seller",sellerSchema);

module.exports = seller;
