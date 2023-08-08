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
exports.deleteTask = exports.updateTask = exports.viewOneTask = exports.viewTask = exports.createTask = void 0;
const taskModel_1 = __importDefault(require("../Model/taskModel"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { task, priority } = req.body;
        const user = yield authModel_1.default.findById(userID);
        const create = yield taskModel_1.default.create({
            name: user === null || user === void 0 ? void 0 : user.userName,
            priority,
            task,
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
        });
        return res.status(201).json({
            message: "Task created successfully",
            data: create,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "can't create task",
            data: error.message,
        });
    }
});
exports.createTask = createTask;
const viewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const view = yield taskModel_1.default.find();
        return res.status(200).json({
            message: "can see all task",
            data: view,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "can't see all task",
            data: error.message,
        });
    }
});
exports.viewTask = viewTask;
const viewOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const one = yield taskModel_1.default.findById(id);
        return res.status(200).json({
            message: "can see one task",
            data: one,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "can't see all task",
            data: error.message,
        });
    }
});
exports.viewOneTask = viewOneTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { task, priority } = req.body;
        const tasked = yield taskModel_1.default.findByIdAndUpdate({ id }, { task, priority }, { new: true });
        return res.status(201).json({
            message: "Task updated successfully",
            data: tasked,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "can't update task",
            data: error.message,
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasked = yield taskModel_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "task deleted successfully",
            data: tasked,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "can't delete task",
            data: error.message,
        });
    }
});
exports.deleteTask = deleteTask;
