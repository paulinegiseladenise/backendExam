"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const mongoose_1 = __importDefault(require("mongoose"));
const JournalEntryModel_1 = require("../Models/JournalEntryModel");
const UserModel_1 = require("../Models/UserModel");
const environment_1 = __importDefault(require("./environment"));
async function database(server, options) {
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default.connection.on("connected", () => {
        server.log.info("MongoDB connected!");
    });
    mongoose_1.default.connection.on("disconnected", () => {
        server.log.info("Mongo DB disconnected!");
    });
    await mongoose_1.default.connect(environment_1.default.DB_URL);
    const models = { UserModel: UserModel_1.UserModel, JournalEntryModel: JournalEntryModel_1.JournalEntryModel };
    server.addHook("onRequest", async (request, reply) => {
        request.db = { models };
    });
}
exports.default = (0, fastify_plugin_1.default)(database);
