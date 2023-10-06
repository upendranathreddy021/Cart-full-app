const usermodel = require("../models/usermodel")
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')
let fs=require('fs')

let reg=async (req,res)=>{
   let qres=await usermodel.findById({"_id":req.body._id})
   if(qres)
   {
    res.send("acc exits with given mail")
   }
   else{
    let hcode=await bcrypt.hash(req.body.password,10)
    let data={...req.body,"password":hcode}
    data=new usermodel(data)
    data.save().then(()=>{
        res.send("acc created")
    }).catch((err)=>{
        console.log(err)
    })
   }

}

let login=async(req,res)=>{
    let qres=await usermodel.findById({"_id":req.body._id})
    if(qres)
    {
        let f=await bcrypt.compare(req.body.password,qres.password)
        if(f)
        {
            let token=jwt.sign({"_id":req.body._id},"abc123")
    res.json({"token":token,"_id":qres._id,"role":qres.role,"name":qres.name})
        }
        else{
            res.send("check password")
        }
    }
    else{
        res.send("check email")
    }


}

let islogin=(req,res,next)=>{
    
    
    let token=req.headers.authorization
    
    try{
        jwt.verify(token,"abc123")
        next()
    }
    catch(err)
    {   try{
        fs.rm(`./prodimgs/${req.file.filename}`,()=>{})
    }
    catch(err)
    {

    }
    
        res.send("please login")
    }
}
let isadmin=async(req,res,next)=>{
    let data=await usermodel.findById({"_id":req.headers.uid})
    if(data)
    {
        if(data.role=='admin')
        {
            next()
        }
        else{
            fs.rm(`./prodimgs/${req.file.filename}`,()=>{})
            res.send("you doesnot have permision to add")
        }
    }
}

module.exports={reg,login,isadmin,islogin}