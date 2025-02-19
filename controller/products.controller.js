const ProductsModel = require("../Model/Product.model");

const productAdd = async (req, res) => {
    const { title, price,img,category,description,discount } = req.body;
    if (!title || !price || !img ||  !category || !description || !discount ) {
        return res.status(400).json({ message: "Please Fill all information" });
    }
    
    // const userID = req.user?._id; //optinal chaining
    // if (!userID) {
    //     return res.status(401).json({ message: "User not authenticated" });
    // }
    // console.log("Authenticated user ID:", userID);

    try {
        await ProductsModel.create({ title, price,img,category,description,discount });
        return res.status(200).json({ message: "Product Add Successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
  
    try {
        const product = await ProductsModel.find()
        if (!(product.length) > 0) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        return res.status(200).json({ message: "Product Get Successfully", product })
        
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
}

const getProductsID = async (req, res) => {
  
    try {
        const productId = req.params.productID;

        const product = await ProductsModel.findById(productId); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const productUpdate=async(req,res)=>{
    const {productID}=req.params
    try{
        const isExistNotes=await ProductsModel.findById(productID)
        if(!isExistNotes){
            return res.status(404).json({ message: "Product Not Found" })
        }
        
        if (isExistNotes.userID != req.user._id) {
            return res.status(403).json({ message: "You are not allowed to update this note" })
        }
        
            await ProductsModel.findByIdAndUpdate(productID,req.body)
            res.status(200).json({message:"Product Update SuccessFully"})

    }
    catch(error){
        return res.status(404).json({ message:error })
    }
    
}

const productDelete = async (req, res) => {
    const { productID } = req.params

    const isExistNotes = await ProductsModel.findById(productID)
    if (!isExistNotes) {
        return res.status(404).json({ message: "Product Not Found" })
    }

    if (isExistNotes.userID != req.user._id) {
        return res.status(403).json({ message: "You are not allowed to delete this product" })
    }

    await ProductsModel.findByIdAndDelete(productID)
    return res.status(200).json({ message: "Product Deleted Successfully" })
}


module.exports = { productAdd , getAllProducts , getProductsID, productUpdate ,productDelete }
