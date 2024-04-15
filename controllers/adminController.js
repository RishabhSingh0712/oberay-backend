const RegisterAdmin=require("../models/authModel")
module.exports.getAdmin= async(req,res,next)=>{
    console.log(req.body);
    const getAdminlist = await RegisterAdmin.find()
    console.log(getAdminlist);
    // res.send("user register")
    res.status(200).json({data:getAdminlist,message:"Admin list get Successfully"})
}

module.exports.getAdminbyName= async(req,res,next)=>{
try{ console.log(req.body,"bodyyyyyyyyyyyyyyyyyyyyyyyyy");
const AdminbyName = await RegisterAdmin.find({name:req.body.name})
console.log(AdminbyName);
// res.send("user register")
res.status(200).json({data:AdminbyName,message:"Admin list get Successfully"})}
   catch(e){
console.log(e);
res.status(500).json({error:e.message,message:"Error occured"})}
}
module.exports.deleteAdmin= async(req,res,next)=>{
    try{ console.log(req.body,"bodyyyyyyyyyyyyyyyyyyyyyyyyy");
    const AdminbyName = await RegisterAdmin.findOneAndDelete({name:req.body.name})
    console.log(AdminbyName);
    // res.send("user register")
    res.status(200).json({data:AdminbyName,message:"Delete Admin"})}
       catch(e){
    console.log(e);
    res.status(500).json({error:e.message,message:"Error occured"})}
    }