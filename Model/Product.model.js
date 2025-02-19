const mongoose=require("mongoose")

const ProductScheama=new mongoose.Schema({
    title:String,
    price:String,
    img:String,
    description:String,
    category:String,
    discount:String
    // userID:{
    //     type:String,
    //     required:true
    // }
},{
    timestamps:true,
    versionKey:false
})

const ProductsModel=mongoose.model("products",ProductScheama)

module.exports=ProductsModel
