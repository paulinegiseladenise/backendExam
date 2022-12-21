"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_routes_1 = __importDefault(require("./content.routes"));
async function ContentService(server, options) {
    await server.register(content_routes_1.default);
}
exports.default = ContentService;
