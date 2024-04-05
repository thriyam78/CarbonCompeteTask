const User=require("../models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
async function signUp(req, res) {
    const { email,name,password,phone } = req.body;
    try {
      const existingUser = await User.findOne({ email: email });
  
      if (existingUser) {
        return res.status(401).json({
          status: "failed",
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        email:email,
        name:name,
        password:hashedPassword,
        phone:phone,
        roles:"admin"
      });
      await newUser.save()
  
      newUser.password = undefined;
  
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      return res.status(200).json({
        status: "success",
        data: {
          token,
          user: newUser,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Something went wrong",
        error: error.message,
      });
    }
  }
  
  async function login(req, res) {
    const { email, password} = req.body;
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid email or password",
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user?.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid email or password",
        });
      }
  
      user.password = undefined;
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
      return res.status(200).json({
        status: "success",
        message: "Login Successfully",
        data: {
          token,
          user: user,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Something went wrong",
        error: error.message,
      });
    }
  }

async function getAllUsers(req,res){
    try {
        const users=await User.find()

        if(user){
            return res.status(200).json({
                status:"success",
                message:"All Users Retrived",
                data:users
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


  

  module.exports={login,signUp,getAllUsers}
  