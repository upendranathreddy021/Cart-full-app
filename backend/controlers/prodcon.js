let { v4:uuidv4}=require('uuid');
let multer=require('multer')
let prodmodel=require('../models/Prodmodel');
let addprod=(req,res)=>{
    let id=uuidv4()

    let data={"_id":id,...req.body,"pimg":req.file.filename}
    data=new prodmodel(data)
    data.save().then(()=>{
        res.send("prod added")
    }).catch((err)=>console.log(err))

}
let getprod=async(req,res)=>{
    try{
    let data=await prodmodel.find()
    res.json(data)
    }
    catch(err)
    {

    }

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './prodimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })


module.exports={addprod,getprod,upload}