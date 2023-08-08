import mongoose from "mongoose";
import { iTaskData } from "../Utils/interface";


const taskModel = new mongoose.Schema({
    name:{
        type:String
    },
    priority:{
        type:String
    },
    task:{
        type:String
    },
    avatar:{
        type:String
    }
})

export default mongoose.model<iTaskData>("tasks" ,taskModel)