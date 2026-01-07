const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/profilePics', express.static('profilePics'))

// app.use(express.static(path.join(__dirname,"./3tierdeploy/build")));

// app.get((req,res)=>{res.sendFile(path.join(__dirname,"./3tierdeploy/build/index.html"));
// });
app.use(express.static(path.join(__dirname, "3tierdeploy", "build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "3tierdeploy", "build", "index.html")
  );
});

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'profilePics')
    },
    filename: function (req, file, cb) {
    
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage: storage});

app.post("/validateToken",upload.none(),async(req,res)=>{
    console.log(req.body);

    let decryptedCredentials = jwt.verify(req.body.token,"itsme");
    console.log(decryptedCredentials)

    let userArr = await user.find().and([{email:decryptedCredentials.email}]);

    
    

   
    if(userArr.length > 0){
        if(decryptedCredentials.password === userArr[0].password){
            let dataToSend ={
                firstName:userArr[0].firstName,
                lastName:userArr[0].lastName,
                email:userArr[0].email,
                age:userArr[0].age,
                phoneNo:userArr[0].phoneNo,
                profilePic:userArr[0].profilePic,
              
            }
            res.json({status: "Success", msg: "Credentials are correct",data:dataToSend})
        }else{
            res.json({status: "Failure", msg: "Invalid Password"})
        }

    }else{
        res.json({status: "Failure", msg:"User doesnot exist"})
    }
})

app.post("/login",upload.none(),async(req,res)=>{
    console.log(req.body);
    let userArr = await user.find().and([{email:req.body.email}]);

    let token = jwt.sign({email:req.body.email,password:req.body.password},"itsme");

    let isValidPassword = await bcrypt.compare(req.body.password,userArr[0].password)

    if(userArr.length > 0){
        if(isValidPassword === true){
            let dataToSend ={
                firstName:userArr[0].firstName,
                lastName:userArr[0].lastName,
                email:userArr[0].email,
                age:userArr[0].age,
                phoneNo:userArr[0].phoneNo,
                profilePic:userArr[0].profilePic,
                token:token
            }
            res.json({status: "Success", msg: "Credentials are correct",data:dataToSend})
        }else{
            res.json({status: "Failure", msg: "Invalid Password"})
        }

    }else{
        res.json({status: "Failure", msg:"User doesnot exist"})
    }
})


app.post("/signup",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    let hashedPassword = await bcrypt.hash(req.body.password,10);
    try{
        let candidate = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        phoneNo: req.body.phoneNo,
        profilePic:req.file.path
    })
    await user.insertMany([candidate])
    console.log("Candidate details Inserted Successfully......!")
    res.json({status: "Success", msg: "Account created Succesfully"})
    }catch(err){
        console.log("Unable to insert the candidate details");
        res.json({status: "Failure", msg:"Unable to create the account"})
    }
})

app.patch("/updateProfile",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    try{
 
    
        if(req.body.firstName.trim().length > 0){
            await user.updateMany({email:req.body.email},
        {firstName:req.body.firstName})
        }
        if(req.body.lastName.trim().length > 0){
            await user.updateMany({email:req.body.email},
        {lastName:req.body.lastName})
            }
            if(req.body.password.trim().length > 0){
            await user.updateMany({email:req.body.email},
        {password:req.body.password})
            }
            if(req.body.age > 0){
            await user.updateMany({email:req.body.email},
        {age:req.body.age})
            }
            if(req.body.phoneNo> 0){
            await user.updateMany({email:req.body.email},
        {phoneNo:req.body.phoneNo})
            }
            if(req.file){
                await user.updateMany({email:req.body.email},
        {profilePic:req.file.path})
            }
            res.json({status:"Success",msg:"User updated successfully"})
        }catch(err){
            res.json({status:"Failure", msg:"Nothing is Updated"})
        }
})

app.delete("/deleteProfile",upload.none(),async(req,res)=>{
    let delCount = await user.deleteMany({email:req.body.email});
    if(delCount.deletedCount > 0){
        res.json({status:"Success", msg:"Account deleted successfully" })
    }else{
        res.json({status:"Failure",msg:"Nothing is Deleted"})
    }
    })


app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}`)
})

let userDetailSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    phoneNo: Number,
    profilePic: String
})

let user = new mongoose.model("users", userDetailSchema,"2509userdetails");



let connectedToMongoDB = async () => {
    try {
    await mongoose.connect(process.env.MDBURL);
    console.log("Successfully connected to MDB.....!")
   
    }catch(err){
    console.log("Error connecting to MDB:");
  }}
  connectedToMongoDB();