const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const session =require("express-session");
const FileUpload = require("express-fileupload")

const cors = require("cors");

let PORT = process.env.PORT || 5000 ;

//some setup
require("dotenv").config();

app.use(FileUpload())
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(session({
    secret : "secret-key",
    resave : false,
    saveUninitialized : false
}))


//mongodb connect
// /process.env.ATLAS_URI come from the same folder file call .env
mongoose.connect(process.env.ATLAS_URI,{ 
    useNewUrlParser:true , 
    useUnifiedTopology: true ,
    useFindAndModify: false,
    useCreateIndex:true
})
const conn = mongoose.connection;
conn.once("open",()=>{
    console.log("Database is working")
})

// page
// app.get("/",(req,res)=>{
//     res.send("<h1>test1</h1>")
// })

// import bookRouter from "./routers/book.js";
const userRouter = require("./routes/user")
const bookRouter = require("./routes/book")
const paymentRouter = require("./routes/payment")
const upload = require("./routes/upload")
const orders = require("./routes/order")

app.use("/users/",userRouter)
app.use("/books/",bookRouter)
app.use("/payments/",paymentRouter)
app.use("/upload/",upload)
app.use("/orders/",orders)


app.listen(PORT,()=>{
    console.log("Server is running on port: " + PORT);
})