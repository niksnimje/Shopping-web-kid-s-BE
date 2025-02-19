const express=require("express")
const isAuth = require("../Middleware/Auth")
const { getAllProducts, productAdd, productDelete, productUpdate, getProductsID } = require("../controller/products.controller")
const isAdmin = require("../Middleware/Admin")


const productsRouter=express.Router("")

// Post , Delete , Patch , Update 

productsRouter.get("/getproduct",getAllProducts)

productsRouter.get("/getproduct/:productID",getProductsID)

productsRouter.post("/addProducts",productAdd)

productsRouter.patch("/update/:productID",productUpdate)

productsRouter.delete("/delete/:productID",isAuth,isAdmin,productDelete)


module.exports=productsRouter
