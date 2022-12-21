"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("@fastify/jwt"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const environment_1 = __importDefault(require("./environment"));
async function Auth(server, options) {
    await server.register(jwt_1.default, {
        secret: environment_1.default.JWT_SECRET,
        sign: {
            expiresIn: environment_1.default.JWT_VALIDITY,
        },
    });
    server.decorate("authenticate", async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (error) {
            reply.code(401).send(error);
        }
    });
}
exports.default = (0, fastify_plugin_1.default)(Auth);
