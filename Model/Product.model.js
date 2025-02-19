const mongoose=require("mongoose")

const ProductScheama=new mongoose.Schema({
    title:String,
    price:Number,
    realPrice:Number,
    img:String,
    img2:String,
    img3:String,
    img4:String,
    description:String,
    category:String,
    discount:Number
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
