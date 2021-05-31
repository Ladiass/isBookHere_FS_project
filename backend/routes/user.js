const express = require("express")
const router = express.Router();
const passwordHash = require("password-hash");

const User = require("../models/user.model");


router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error :" + err))
})

router.route("/:id").get((req, res) => {

    User.findById(req.params.id)
        .then((data) => {
            return res.json(data)
        })
        .catch(err=>res.json(0))
    return res.json(0);
})

router.route("/get").post((req,res)=>{
    let id = req.body.id;
    User.findById(id)
        .then(user=>res.json(user))
        .catch(err=>res.json(0))
})
router.route("/username/:id").get((req,res)=>{
    User.findOne({"username":req.params.id},{"_id":1})
        .then(id=>res.json(id))
        .catch(err=>res.json(0))
})

router.route("/register").post((req, res) => {
    let username = req.body.username;
    let password = passwordHash.generate(req.body.password);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let image = req.body.image || "../image/users/nonUser.png";

    let newUser = new User({ username, password, image, firstname, lastname });

    newUser.save()
        .then(() => res.json(1))
        .catch(err => res.json("Error : " + err))
})

router.route("/delete/:id").delete((req, res) => {
    User.findOneAndDelete({_id:req.params.id})
        .then(() => res.json("Successfully deleted"))
        .catch(err => res.json("ERROR: " + err))
})



//login
router.route("/login").post((req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({username})
        .then((user)=>{
            if(passwordHash.verify(password,user.password)){
                res.json(user)
            }
            res.json(0)
        })
        .catch(err=>console.log(err))
})

//update
router.route("/update").post((req,res)=>{
    let id = req.body.id
    let username = req.body.username;
    // let password = passwordHash.generate(req.body.password);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    // let image = req.body.image;

    User.findByIdAndUpdate(id,{ username, firstname, lastname })
    .then(res.json(1))
    .catch(err=>res.json(0))
})

////update password
router.route("/update/password").post((req,res)=>{
    let id = req.body.id
    let Old_password = req.body.oldpass;
    let New_password = req.body.newpass;

    User.findById(id)
    .then(user=>{   
        // password verify
        if(passwordHash.verify(Old_password,user.password)){
            User.findByIdAndUpdate(id,{password: New_password})
                .then(res.json(1))
                .catch(res.json(0))
        }
    })
    .catch(err=>res.json({status:0,msg:err}))
})

////image update
router.route("/update/image").post((req,res)=>{
    let id = req.body.id;
    let imageUrl = req.body.image;

    User.findByIdAndUpdate(id,{image:imageUrl})
        .then(res.json({status:1,msg:"Success"}))
        .catch(err=>res.json({status:0,msg:err}))
    return
})  


module.exports = router;