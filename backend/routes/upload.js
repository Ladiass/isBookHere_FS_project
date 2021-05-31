const express = require("express")
const router = express.Router();
// const FileUpload = require("express-fileupload")
// express().use(FileUpload())


router.route("/user").post((req,res)=>{
    const file = req.files.file;
    file.mv(`${__dirname}/../../public/images/user.${file.name}`,err=>{
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    })
    res.json(`/images/user.${file.name}`);    
})

router.route("/products").post((req,res)=>{
    const file = req.files.file;
    file.mv(`${__dirname}/../../public/images/products.${file.name}`,err=>{
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    })
    res.json(`/images/products.${file.name}`);    
})

module.exports = router