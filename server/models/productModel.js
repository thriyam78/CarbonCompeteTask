const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true,
    },
    materialsUsed:[{type:String,default:""}],
    approximateCO2Release:{
        type:Number
    }
})

const Product=mongoose.model("Product",productSchema)

module.exports=Product