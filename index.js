const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors");

const connection = require("./Config/db")
const userRourtes = require("./Routes/user.routes")


const cookieParser = require("cookie-parser");
const productsRouter = require("./Routes/product.routes");

const app=express()
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:3000"],
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.static("./uploads"))
app.use("/auth",userRourtes)

app.use("/products",productsRouter)

app.get("/",(req,res)=>{
    res.send("Hellow")
})

app.listen(process.env.PORT || 3000 ,async()=>{
    try {
        await connection
        console.log("server is running")
        
    } catch (error) {
        console.log(error)
    }
})