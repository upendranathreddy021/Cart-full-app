const cartmodel = require("../models/Cartmodel")
let{v4:uuidv4}=require('uuid')

let addcart=async(req,res)=>{
    
    let result=await cartmodel.find({"pid":req.body.pid,"uid":req.body.uid})
    if(result.length==0)
    {
        let data={...req.body,"qty":1,"_id":uuidv4()}
        data=new cartmodel(data)
        data.save().then(()=>{
            res.send("prod added into cart")
        }).catch((err)=>{

        })
    }
    else{
        res.send("prod available in cart")
    }

}
let getcart=async(req,res)=>{
    let data=await cartmodel.find({"uid":req.params.uid})
    res.json(data)

}
let incqty=async(req,res)=>{
    await cartmodel.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":1}})
    res.send("updated")

}
let dec=async(req,res)=>{
    let data=await cartmodel.findById({"_id":req.body._id})
    
    if(data.qty>1)
    {
    await cartmodel.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":-1}})
    res.send("updated")
    }
    else{
        res.send("jf")
    }

}
let del=async(req,res)=>{
    await cartmodel.findByIdAndDelete({"_id":req.params.id})
    res.send("deleted")

}
module.exports={addcart,getcart,incqty,dec,del}