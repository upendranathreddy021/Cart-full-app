let express=require('express')
const { addcart, getcart, incqty, dec, del } = require('../controlers/cartcon')
let {islogin}=require("../controlers/usercon")
let cartroute=new express.Router()


cartroute.post("/add",islogin,addcart)
cartroute.get("/get/:uid",islogin,getcart)
cartroute.get("/get",islogin,getcart)
cartroute.put("/inc",islogin,incqty)
cartroute.put("/dec",islogin,dec)
cartroute.delete("/delete/:id",islogin,del)
module.exports=cartroute