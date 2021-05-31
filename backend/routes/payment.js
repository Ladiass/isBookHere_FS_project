const router = require("express").Router();
const Payments = require("../models/payment.model");
const Orders = require("../models/order.model")
const uuid = require("uuid");

router.route("/").get((req,res)=>{
    Payments.find()
        .then(payments=>res.json(payments))
        .catch(err=>res.json(err))
})
router.route("/add").post((req,res)=>{
    const track = "MY"+ uuid.v4();
    const orderId = req.query.orderId;
    const buyer = req.query.buyer

    const newPayment = new Payments({track, orderId ,buyer});
    newPayment.save()
        .then(()=>res.json("Successfully added"))
        .catch(err=>res.json(err))
})
router.route("/:id").get((req,res)=>{
    Payments.findById(req.params.id)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
})
router.route("/delete/:id").delete((req,res)=>{
    const payment = Payments.findById(req.params.id)
    payment.remove()
        .then(()=>res.json("Successfully deleted"))
        .catch(err=>res.json(err))
})
// router.route()
module.exports= router;