const express=require('express');
const studentrouter=require('./Student')
const Productrouter=require("./Product")
const app=express();
const cors=require('cors')
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://mongo:mongo@ac-m8gl3jo-shard-00-00.cdagbek.mongodb.net:27017,ac-m8gl3jo-shard-00-01.cdagbek.mongodb.net:27017,ac-m8gl3jo-shard-00-02.cdagbek.mongodb.net:27017/?ssl=true&replicaSet=atlas-gyuwqd-shard-0&authSource=admin&retryWrites=true&w=majority')
mongoose.connection.on('error',err=>{
  console.log('database is not connected')
});

mongoose.connection.on('connected',connected=>{
    console.log('database is connected')
  });
app.use(cors())
  app.use(bodyparser.urlencoded({extended:false}))
  app.use(bodyparser.json())
//app.use(cors)
app.use('/student',studentrouter)
app.use('/product',Productrouter)
app.use((req,res,next)=>{
    res.status(200).json({
        message:"app is running"
    })
})


module.exports=app;