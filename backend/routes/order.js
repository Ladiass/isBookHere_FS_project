const router = require("express").Router();
const orders = require("../models/order.model");

router.route("/").get((req,res)=>{
    orders.find()
        .then((order)=>res.json(order))
        .catch(err=> res.json("ERROR: "+err))
})
router.route("/:username").get((req,res)=>{
    orders.find({"payer":req.params.username})
        .then((order)=>res.json({status:1,data:order,msg:"Success"}))
        .catch(err=> res.json({status:0,msg:err}))
})

router.route("/track/:id").get((req,res)=>{
    orders.findById(req.query.id)
        .then((order)=>res.json(order))
        .catch(err=> res.json("ERROR: "+err))
})

router.route("/add").post((req,res)=>{
    let itemID = req.body.item.split(",")
    let payer = req.body.payer;
    const newOrder = new orders({itemID,payer});
    newOrder.save()
        .then(()=>res.json("Order added"))
        .catch(err=>res.json("ERROR: ".err))
})

router.route("/delete/:id").delete((req,res)=>{
    const order = orders.findById(req.query.id);
    order.remove()
        .then(()=>res.json("Successfully deleted"))
        .catch(err=>res.json(err))
})

module.exports= router;