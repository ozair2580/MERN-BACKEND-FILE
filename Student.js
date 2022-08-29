const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const students=require('./StudentSchema');




router.post('/signup',(req,res,next)=>{
 bcrypt.hash(req.body.password,10,(err,hash)=>{
     if(err){
         return res.status(500).json({
             error:err
         })
     }

    //  if(students.find({name:req.body.name},{email:req.body.email},{phone:req.body.phone})){
    //   return res.status(500).json({
    //     error:"your account is already signup"})
    //  }
    //  else{

    
    const student=new students({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        password:hash,
        phone:req.body.phone,
        
    })

    student.save().then(result=>{
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
    
})

router.post('/login', (req,res,next)=>{
    students.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(500).json({
                empty:"use not exist"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
          if(!result){
              return res.status(404).json({
                  password:"password not matched"
              })
          }
          
          if(result){
              const token=jwt.sign({
               name:user[0].name,
                email:user[0].email,
                phone:user[0].phone,

              },'this is dummy text',{
                  expiresIn:'24h'
              })
              res.status(200).json({
                  name:user[0].name,
                  email:user[0].email,
                  phone:user[0].phone,
                  token:token
              })
          }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

    // if(req.body.password && req.body.email){
    //     let user = await students.findone(req.body).select('-password')
    //     if (user){
    //         res.send(user)
    //     }
    //     else{
    //         res.send({result :"no user"})

    //     }
    // }
    // res.send({result:"no user"})
})



module.exports=router;