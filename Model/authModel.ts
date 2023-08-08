import mongoose from "mongoose";
import { iAuthData } from "../Utils/interface";

const authModel = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },
    avatar:{
        type:String
    },
    avatarUrl:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    // confirmPassword:{
    //     type:String,
    // }
})

export default mongoose.model<iAuthData>("auths" , authModel)