const express=require("express")
const { login, signUp, getAllUsers } = require("../controller/userController")
const userRouter=express.Router()

userRouter.post("/login",login)
userRouter.post("/signup",signUp)
userRouter.get("/",getAllUsers)

module.exports=userRouter