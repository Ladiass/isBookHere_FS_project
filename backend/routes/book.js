const router = require("express").Router();

const Book = require("../models/book.model")

router.route("/").get((req,res)=>{
    Book.find().sort({"CreateAt":-1})
    .then(books => res.json(books))
    .catch(err=>res.json("ERROR: "+err))
})
router.route("/:id").get((req,res)=>{
    Book.findById(req.params.id)
        .then(book=>res.json(book))
        .catch(err=> res.json({status:0,msg:err}))
})
router.route("/").post((req,res)=>{
    let ary_ids = req.body.ids.split(",");
    Book.find({_id:{$in:ary_ids}})
        .then(books=>res.json({status:1,msg:"Success",data:books}))
        .catch(err=>res.json({status:0,msg:err,data:{}}))
})
router.route("/author/:author").get((req,res)=>{
    Book.find({"author":req.params.author}).sort({"CreateAt":-1})
    .then(books => res.json(books))
    .catch(err=>res.json("ERROR: "+err))
})



router.route("/add").post((req,res)=>{
    let title = req.body.title;
    let price = parseInt(req.body.price);
    let quantity = parseInt(req.body.quantity);
    let description = req.body.desc || "This guys is too lazy , he left nothing";
    let image = req.body.image;
    let author = req.body.author;

    let newBook = new Book({title,price,quantity,description,image,author});

    newBook.save()
        .then(()=> {
            res.json(1)
        })
        .catch(err=> res.json("Error : "+ err))
})

router.route("/:id").delete((req, res) => {

    const book = Book.findById(req.params.id)
    book.remove()
        .then(()=>res.json("Successfully deleted"))
        .catch(err=>res.json("ERROR:"+err))
})
router.route("/:id").put((req,res)=>{
    let title = req.body.title;
    let price = parseInt(req.body.price);
    let quantity = parseInt(req.body.quantity);
    let description = req.body.description;
    let image = req.body.image;
    let author = req.body.author;
    
    Book.findByIdAndUpdate(req.params.id,{title,price,quantity,description,image,author},{new:true})
    .then(data=>res.json(data))
    .catch(err=>res.json(0))
})

router.route("/sort/:bool").get((req,res)=>{
    Book.find({}).sort({title:req.params.bool})
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
})
module.exports = router;