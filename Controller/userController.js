import { User } from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const SignUp = async (req, res) => { 
  try {
    const { Name, Email, Password } = req.body;
    const UserExit = await User.findOne({ Email });
    if(UserExit){
       return res.status(400).json({ message: "User Already Register"});
    }
    const hashPassword=await bcrypt.hash(Password,10)
    const newUser= await new User({
        Name,
        Email,
        Password:hashPassword
    })
    await newUser.save();
    return res.status(201).json({ message: "User Register Successfully ",user:newUser});

   
  } catch (error) {
    res.status(500).json({message:"Server Error",error})
  }
};
export const LogIn=async(req,res)=>{
 try{
  const{Email,Password}=req.body;
  const user=await User.findOne({Email})
  const match=user&&await bcrypt.compare(Password,user.Password)
console.log(match)
  if(!match){
  return res.status(201).json({message:"Invalid User Name and password"})
  }
  const token=await jwt.sign({User_id:user.id},process.env.Secret_Key)
  console.log(token)
  res.cookie("uid",token,{ httpOnly: true, secure: false, maxAge: 360000
  })
  return res.status(200).json({message:"User Successful Login",user,token})

 }
 catch(error){
  console.log(error)
 }
}
export const Logout=async(req,res)=>{
  try{
      res.clearCookie("uid")
      res.status(200).json({message:"user Logout Seccessfully"})
  }
  catch(error)
{
console.log(error)
res.status(500).json({message:"internal Server Error"})
console.log(error);
}
}
