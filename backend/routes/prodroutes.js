let express=require('express')
let {islogin,isadmin}=require("../controlers/usercon")
let {addprod,getprod,upload}=require("../controlers/prodcon")

let prodroute=new express.Router()
prodroute.post("/add",upload.single('pimg'),islogin,isadmin,addprod)
prodroute.get("/get",getprod)

module.exports=prodroute