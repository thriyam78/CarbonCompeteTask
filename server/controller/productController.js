const Product=require("../models/productModel")


async function getAllProducts(req,res){
    try {
        const allProducts=await Product.find()

        if(allProducts){
            return res.status(200).json({
                status:"Success",
                message:"Products Retrived Successfully",
                product:
                    allProducts
                
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:"Failed",
            message:"Something went wrong",
            error:error.message
        })
    }
}

async function addProducts(req,res){
    try {
        const {productName,productDescription,materialsUsed,approximateCO2Release}=req.body
        const userId=req.user.userId
        const existingProduct=await Product.findOne({productName:productName})
        if(existingProduct){
            return res.status(401).json({
                status:"Failed",
                message:"Product already exists"
            })
        }
        const product=await Product.create({
            productName:productName,
            productDescription:productDescription,
            materialsUsed:materialsUsed,
            approximateCO2Release:approximateCO2Release
        })

        await product.save()

        if(product){
            return res.status(200).json({
                status:"Success",
                message:"Product Added Successfully",
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:"Failed",
            message:"Something went wrong",
            error:error.message
        })
        
    }
}

async function updataProduct(req,res){
    try {
        const {productId}=req.params
        const {productName,productDescription,materialsUsed}=req.body

        if(productName!=="none" || productName!==""){
            const updateName=await Product.findByIdAndUpdate({_id:productId},{$set:{productName:productName}},{new:true})
            if(updateName){
                return res.status(200).json({
                    status:"Success",
                    message:"Updated ProductName successfully"
                })
            }
        }
        
        if(productDescription!=="none" || productDescription!==""){
            const updateDescription=await Product.findByIdAndUpdate({_id:productId},{$set:{productDescription:productDescription}},{new:true})
            if(updateDescription){
                return res.status(200).json({
                    status:"Success",
                    message:"Updated Product Description successfully"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status:"Failed",
            message:"Something went wrong",
            error:error.message
        })
        
    }
}


async function deleteProduct(req,res){
    try {
        // const userId=req.user.userId
        const {productId}=req.params
        const deletedProduct=await Product.findByIdAndDelete({_id:productId})
        if(deletedProduct){
            return res.status(200).json({
                status:"success",
                message:"Product Deleted Successfully"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            status:"Failed",
            message:"Something went wrong",
            error:error.message
        })
    }
}
module.exports={getAllProducts,addProducts,updataProduct,deleteProduct}