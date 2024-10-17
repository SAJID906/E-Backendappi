import { User } from '../Model/userModel.js';
import jwt from 'jsonwebtoken'
export const checkAdmin = async (req, res, next) => {
  try {
    // use to access cookies form Browser
    const token = req.cookies.uid;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    //Decoded the token
    const decoded=await jwt.verify(token,process.env.Secret_Key)
    //Find document by findById
    const user=await User.findById(decoded.User_id)
if(user.Role!=="admin"){
    return res.status(401).json({message:"User is Not Admin"})
}

    console.log(user);
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error)
  }
};
