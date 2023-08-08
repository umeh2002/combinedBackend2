"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinUser = exports.deleteOneUser = exports.updateOneUser = exports.findOneUser = exports.findUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../Config/cloudinary"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userName, email, password, } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        // if(password !== confirmPassword){
        //     return res.status(400).json({error:"Confirm password must be password"})
        //    }
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const user = yield authModel_1.default.create({
            userName,
            email,
            password: hashed,
            avatar: secure_url,
            avatarID: public_id,
            // comfirmPassword:hashed
        });
        //   console.log(user)
        res.status(201).json({
            message: "User Successfully Created",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error creating user",
            data: error.message,
            err: error
        });
    }
});
exports.createUser = createUser;
const findUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find().sort({ createdAt: -1 });
        res.status(201).json({
            message: "find Users",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error  finding user",
            data: error
        });
    }
});
exports.findUsers = findUsers;
const findOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const user = yield authModel_1.default.findById(UserID);
        res.status(201).json({
            message: "find one User",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error finding User",
        });
    }
});
exports.findOneUser = findOneUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const { UserID } = req.params;
        const user = yield authModel_1.default.findByIdAndUpdate(UserID, { name }, { new: true });
        res.status(201).json({
            message: "User Succesfully Updated",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error updating User",
        });
    }
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const user = yield authModel_1.default.findByIdAndDelete({ id: UserID });
        res.status(201).json({
            message: "Successfully deleted user",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error deleting User",
        });
    }
});
exports.deleteOneUser = deleteOneUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (checkPassword) {
                return res.status(201).json({
                    message: "user sign in",
                    data: user._id,
                });
            }
            else {
                res.status(404).json({ message: "password not correct" });
            }
        }
        else {
            res.status(404).json({ message: "user not found" });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "Error while Signing User In",
        });
    }
});
exports.signinUser = signinUser;
