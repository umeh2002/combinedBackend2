"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../Config/multer"));
const authController_1 = require("../Controller/authController");
const router = express_1.default.Router();
router.route("/get-User").get(authController_1.findUsers);
router.route("/register-user").post(multer_1.default, authController_1.createUser);
router.route("/sign-in-user").post(authController_1.signinUser);
router.route("/:UserID/get-one-User").get(authController_1.findOneUser);
router.route("/:UserID/update-one-User").patch(authController_1.updateOneUser);
router.route("/:UserID/delete-one-User").delete(authController_1.deleteOneUser);
exports.default = router;
