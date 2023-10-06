let mongoose=require('mongoose')
let cartsch=new mongoose.Schema({
    "_id":String,"name":String,"uid":String, "qty":Number,"price":Number,"pid":String,
    "pimg":String,"desc":String
})
module.exports=mongoose.model("cart",cartsch)