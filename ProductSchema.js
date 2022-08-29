const mongoose=require('mongoose');
const Product=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number,
    category:String,
    company:String,
    

})
module.exports=mongoose.model("Product",Product)