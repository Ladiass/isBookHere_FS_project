const mongoose =  require("mongoose");
const Schema =mongoose.Schema;

const orderSchema = new Schema({
    itemID:{
        type: [String],
        required:true
    },
    createAt:{
        type:Date,
        default:new Date()
    },
    payer:{
        type:String,
        required:true
    }
})

const order = mongoose.model("order",orderSchema);
module.exports = order ;