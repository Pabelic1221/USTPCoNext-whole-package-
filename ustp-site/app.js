const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine","ejs");


const jwt = require("jsonwebtoken");
const JWT_SECRET = "qwertyasdfzxc1238910!?"

const  mongoUrl = "mongodb+srv://pabelicjush:Pabelic12212001@cluster0.zou00st.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
}).then(()=>{console.log("connected to database");
}).catch((e)=>console.log(e));

require("./userDetails");

//Website

const User = mongoose.model("UserInfo");
app.post("/register", async(req,res)=>{
    const {fname, lname, email, password}=req.body;

    const encryptedPassword =await bcrypt.hash(password,10);
    try{
        const oldUser= await User.findOne({email});
        if(oldUser){
           return res.send({error:"User Exists"});
        }
        await User.create({
            fname,
            lname,
            email,
            password:encryptedPassword,
        });
        res.send({status: "okay"});      
    } catch (error){
        res.send({status: "error" });
    }
});

app.post("/login-user", async(req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user){
        return res.json({error: "User Not Found"});
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, JWT_SECRET,{
           expiresIn: 60,
        });

        if (res.status(201)) {
        return res.json({status: "okay", data: token});
        }
        else {
            return res.json({error: "error"});
        }
    }
    res.json({status: "error", error: "Invalid Password"});
});

app.post("/userData", async (req, res)=>{
    const {token} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        console.log(user);
        const useremail = user.email;
        User.findOne({email: useremail})
        .then((data)=>{
            res.send({status: "okay", data: data});
        })
        .catch((error)=> {
            res.send({status: "error", data: error});
        });
    }catch (error){}
});

app.post("/forgot-password", async(req, res)=>{
    const {email} = req.body;
    try{
        const oldUser = await User.findOne({email});
        if (!oldUser){
            return res.json("User Not Exist!");
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret,{expiresIn: "5m",});
        const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
        console.log(link);
    }   catch (error){}
});

app.get("/reset-password/:id/:token", async(req, res)=>{
    const {id, token} = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id});
    if (!oldUser){
        return res.json({status:"User Not Exist!"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token, secret);
        res.render("index",{email: verify.email});
    }catch(error){
        console.log(error);
        res.send("Not Verified")
    }
});

app.post("/reset-password/:id/:token", async(req, res)=>{
    const {id, token} = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id});
    if (!oldUser){
        return res.json({status:"User Not Exist!"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({
            _id: id,
        },{
            $set:{
                password: encryptedPassword,
            }
        })
        res.json({status: "Password Verified"});
    }catch (error){
        console.log(error);
        res.send("Not Verified");
    }
});
//Mobile


app.listen(5000,()=>{
    console.log("port 5000, Server started...");
});