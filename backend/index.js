const express =  require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv=require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit: "10mb"}))



const PORT=process.env.PORT || 8080 || 443
//mongodbconnection
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Connect to Databse"))
.catch((err)=>console.log(err))
//api

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
        type: String,
        unique: true,

    },
    password: String,
    confirmPassword: String,
    image: String,

})

const userModel = mongoose.model("user",userSchema)

app.get("/",(req,res)=>{
    res.send("server is running")
})

//signup
app.post("/signup",async(req,res)=>{
    console.log(req.body)
    const {email}=req.body

    // userModel.findOne({email : email},(err,result)=>{
    //     console.log(result)
    //     console.log(err)
    //     if(email===email){
    //       res.send({message:"Email id is already register"})
    //    }
    //    else{
    //      const data=userModel(req.body)
    //       const save = data.save()
           res.send({message:"Successfully Sign Up",alert:true})
        //}
   //  })
})

//api login
app.post("/login",(req,res)=>{
    console.log(req.body)
  //const {email}= req.body
   //userModel.findOne({email : email},(err,result)=>{
       // if(result){
          //  console.log(result)
           // console.log(err)
        //    const dataSend={
        //         _id:result._id,
        //         firstName: result.firstName,
        //         lastName: result.lastName,
        //       email: result.email,
        //        password: result.password,
        //         confirmPassword: result.confirmPassword,
        //         image: result.image,

        //     };
           // console.log(dataSend)
             res.send({message:"Login is successfully",alert:true})
        
       //}
       //else{
        //res.send({message:"Email is not available,please sign up",alert:false})
      // }

   // })
})

//product section
const schemaProduct = mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String,
});

const productModel = mongoose.model("product",schemaProduct)

//save product in data
//api
app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message:"Upload Successfully"})
})

//
app.get("/product",async(req,res)=>{
    const data = await  productModel.find({})
    res.send(JSON.stringify(data))
})

app.listen(PORT,()=>console.log("Server is running at Port:"+PORT))