let mongoose=require('mongoose')
let prodsch=new mongoose.Schema({

    "_id":String,"name":String,"cat":String,"price":Number,"pimg":String,
    "desc":String ,"comments":{"type":[],"default":[]}

})
module.exports=mongoose.model("prod",prodsch)