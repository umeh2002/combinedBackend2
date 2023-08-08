import mongoose, { Mongoose } from "mongoose";

interface iTask{
    name?:string;
    task?:string;
    priority?:string;
    avatar?:string
}

interface iAuth {
    userName?:string;
    password?:string;
    // confirmPassword?:string;
    avatar?:string;
    avatarUrl?:string;
    email?:string;

}

export interface iAuthData extends iAuth, mongoose.Document{}
export interface iTaskData extends iTask, mongoose.Document{}