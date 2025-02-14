const express=require("express")
const isAuth = require("../Middleware/Auth")
const { getAllProducts, productAdd, productDelete, productUpdate } = require("../controller/products.controller")
const isAdmin = require("../Middleware/Admin")


const productsRouter=express.Router("")

// Post , Delete , Patch , Update 

productsRouter.get("/getproduct",isAuth,getAllProducts)

productsRouter.post("/addProducts",isAuth,isAdmin,productAdd)

productsRouter.put("/update/:productID",isAuth,isAdmin,productUpdate)

productsRouter.delete("/delete/:productID",isAuth,isAdmin,productDelete)


module.exports=productsRouter
