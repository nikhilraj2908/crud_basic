// const express = require('express');
// const app = express();
// const cors = require("cors")
// const mongoose = require('mongoose')
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const bcrypt = require("bcrypt")

const express=require("express")
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended : true }));
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://127.0.0.1:27017/practiceproject")
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => {
        console.log(error);
    })

const userschema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
})

const User = mongoose.model("user", userschema);

const taskschema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String, required:true}
})

const Task = mongoose.model("task",taskschema);



app.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !email || !password) {
            res.status(404).json({ message: "not sufficient info" })
        }
        const saltRound = 10;
        const hashpassword = await bcrypt.hash(password, saltRound)

        const newuser = new User({ username, email, password: hashpassword })
        newuser.save()
            .then(() => {
                console.log("user registered succefully")
                res.status(200).json({ message: "user created successfully" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "user not registered " })

            })
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/loginuser', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "username and password is required" })
        }
        const data = await User.findOne({ username: username })
        if (!data) {
            return res.status(401).json({ message: "username not found" })
        }
        const ismatch = await bcrypt.compare(password, data.password);
        if (!ismatch) {
            return res.status(401).json({ message: "password is incorrect" })
        }
        else{
            return res.status(200).json({ message: "User logged in successfully." })
        } 
    }
    catch (err) {
        console.log(err);
    }
})

app.post('/addtask',async(req,res)=>{
    try{
        const{title,description,date,time}=req.body;
        if(!title||!description||!date||!time){
            return res.status(400).json({message:"title,description,date and time is required"})
        }
        const newtask=new Task({title,description,date,time})
        newtask.save()
        .then(()=>{
            console.log("task added successfully");
            res.status(200).json({message:"task added successfully"})
        })
        .catch(err=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err)
    }
})

app.get('/gettask',async(req,res)=>{
    try{
        const task=await Task.find({});
        return res.status(200).json(task);
    }
    catch(err){
        console.log(err);
    }
})

app.delete("/deletetask/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const result=await Task.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Task not found" });
        }
        
        res.status(200).send({ message: "Task deleted successfully" });
   
    }catch(err){
        console.log(err);
    }
})
app.patch("/updatelist/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const{title,description,date,time}=req.body;
        const result=await Task.findByIdAndUpdate(id,{title,description,date,time},{new:true})
        if (!result) {
            return res.status(404).send({ message: "Task not found" });
        }
        return res.status(200).json({message:"edited successfull"});
    }
    catch(err){
        console.log(err);
    }
})
app.listen(5000, () => console.log("port listening on 5000"))