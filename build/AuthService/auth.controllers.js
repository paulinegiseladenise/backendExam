"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteController = exports.LoginController = exports.RegisterController = void 0;
const validateEmail_1 = __importDefault(require("../Utilities/validateEmail"));
async function RegisterController(request, reply) {
    const response = {
        success: false,
        message: "",
        token: null,
    };
    if (!(0, validateEmail_1.default)(request.body.email)) {
        response.success = false;
        response.message = "Enter a valid email address!";
        return await reply.status(400).send(response);
    }
    const { UserModel } = request.db.models;
    const existsUser = await UserModel.findOne({ email: request.body.email });
    if (existsUser) {
        response.success = false;
        response.message = "User already exists!";
        return await reply.status(400).send(response);
    }
    const newUser = {
        _id: null,
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        journalIds: [],
    };
    const createdUser = await UserModel.create(newUser);
    const token = {
        name: createdUser.name,
        email: createdUser.email,
        userId: createdUser._id,
    };
    const jwtToken = await reply.jwtSign(token);
    response.success = true;
    response.message = "User successfully created!";
    response.token = jwtToken;
    await reply.status(201).send(response);
}
exports.RegisterController = RegisterController;
async function LoginController(request, reply) {
    const { UserModel } = request.db.models;
    const response = {
        success: false,
        message: "",
        token: null,
    };
    const user = await UserModel.findOne({
        email: request.body.email,
        password: request.body.password,
    });
    if (!user) {
        response.success = false;
        response.message = "User does not exist or wrong password!";
        response.token = null;
        return await reply.status(403).send(response);
    }
    const token = {
        name: user.name,
        email: user.email,
        userId: user._id,
    };
    const jwtToken = await reply.jwtSign(token);
    response.success = true;
    response.message = "Successfully logged in!";
    response.token = jwtToken;
    console.log("Returning::", response);
    return await reply.status(200).send(response);
}
exports.LoginController = LoginController;
//delete
async function DeleteController(request, reply) { }
exports.DeleteController = DeleteController;
;
