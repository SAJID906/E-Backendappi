import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:true,
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true,
        unique:true

    },
    Role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
  
},{timestamps:true})
export const User=mongoose.model("user",UserSchema)