const express=require("express")
const { addProducts, getAllProducts, updataProduct, deleteProduct } = require("../controller/productController")
const {checkAuth}=require("../middlewares/checkAuth")
const productRoute=express.Router()

productRoute.get("/allProducts",getAllProducts)
productRoute.post("/addProduct",checkAuth,addProducts)
productRoute.patch("/updateProduct",checkAuth,updataProduct)
productRoute.delete("/deleteProduct/:productId",checkAuth,deleteProduct)

module.exports=productRoute