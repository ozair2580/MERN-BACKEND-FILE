const mongoose=require('mongoose');
const students=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    password:String,
    phone:Number,
    

})
module.exports=mongoose.model("Balak",students)