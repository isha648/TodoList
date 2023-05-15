// const express=require("express");
// const bodyparser=require("body-parser");
// var app=express();
// app.set("view engine","ejs");
// app.use(express.urlencoded({extended:true}));
// app.use(express.static('public'));

// const mongoose =require("mongoose");
// const ConnectDB = async ()=>{

//     try{
//         const conn = await mongoose.connect("mongodb://127.0.0.1:27017/todo")
//         console.log("MONGODB Database connected on "+conn.connection.port)
//     }catch(err){
//         console.log("MONGODB Database is not connected")
//         console.log(err);
//         process.exit();
//     }
// }
// ConnectDB();
// const trySchema=new mongoose.Schema({
//     name:String
// });
// const item=mongoose.model("task",trySchema)
// const todo=new item({
//     name:"create some videos"
// });
// const todo2=new item({
//     name:"learn dsa"
// })
// const todo3=new item({
//     name:"learn react"
// })
// const todo4=new item({
//     name:"take some rest"
// })
// app.get("/",function(req,res){
//     item.find({})
//         .then(foundItems => {
//             res.render("list",{dayej: foundItems});
//         })
//         .catch(err => {
//             console.log(err)
//         });
// });
// app.post("/",function(req,res){
//     const itemName=req.body.ele1;
//     const todo4=new item({
//         name:itemName
//     });

// todo4.save();
// res.redirect("/");
// });
// app.post("/",function(req,res){
//     const checked=req.body.checkbox1;
//     item.findByIdAndDelete(checked).catch(err=>console.log(err))
//    return res.redirect("/")
// });
// app.post("/delete",function(req,res){
//     const checked=req.body.checkbox1;
//     item.findByIdAndDelete(checked).catch(err=>{
//         console.log(err)
//     });

//     return res.redirect("/");
// });
// app.post("..",async (req,res)=>{
//     await item.findByidAndRemove()
//  })
// app.listen("2000",function(){
//     console.log("server is running");
// });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/todo");
        console.log("MongoDB Database connected on port: " + conn.connection.port);
    } catch (err) {
        console.log("MongoDB Database is not connected");
        console.error(err);
        process.exit(1);
    }
};
connectDB();

// Create a mongoose schema
const taskSchema = new mongoose.Schema({
    name: String
});

// Create a mongoose model
const Task = mongoose.model("Task", taskSchema);

// Create sample tasks
const todo = new Task({
    name: "create some videos"
});
const todo2 = new Task({
    name: "learn dsa"
});
const todo3 = new Task({
    name: "learn react"
});
const todo4 = new Task({
    name: "take some rest"
});

app.get("/", function (req, res) {
    Task.find({})
        .then(foundItems => {
            res.render("list", { dayej: foundItems });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/", function (req, res) {
    const itemName = req.body.ele1;
    const newTask = new Task({
        name: itemName
    });

    newTask.save()
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/delete", function (req, res) {
    const checked = req.body.checkbox1;
    Task.findByIdAndDelete(checked)
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});

app.listen(2000, function () {
    console.log("Server is running on port 2000");
});
