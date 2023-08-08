"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authModel = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },
    avatar: {
        type: String
    },
    avatarUrl: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    // confirmPassword:{
    //     type:String,
    // }
});
exports.default = mongoose_1.default.model("auths", authModel);
