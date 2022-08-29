const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Products=require('./ProductSchema');


router.get('/get',(req,res,next)=>{
    Products.find().then(result=>{
        res.status(200).json({
            message:result
        })
     }).catch(err=>{
      res.status(500).json({
             error:err
         })
    })
    
})
router.post('/Addproduct',(req,res,next)=>{
   
       
    const Product=new Products({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        company:req.body.company,
        
    })

    Product.save().then(result=>{
        console.log(result);
        res.status(200).json({
            message:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    

})

router.delete('/delete/:id',(req,res,next)=>{
  Products.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            deletitem:result
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })

})

router.get('/search/:id',async (req,res,next)=>{
    const data=await Products.find({
         "$or":[
             {"name":{$regex:req.params.id}},
             { "company":{$regex:req.params.id}},
            { "category":{$regex:req.params.id}},
             
         ]
     })
         res.send(data);
     
     
 })

 router.put('/update/:id',async (req,res,next)=>{
     const result=await Products.findOneAndUpdate({_id:req.params.id}
        ,
        {
            $set:{
                name:req.body.name,
                price:req.body.price,
                category:req.body.category,
                company:req.body.company
            }
                
            
            
            
        })

        res.send(result)
        
        
 })
    

module.exports=router;