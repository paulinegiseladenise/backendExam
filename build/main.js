"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const auth_index_1 = __importDefault(require("./AuthService/auth.index"));
const auth_1 = __importDefault(require("./Utilities/auth"));
const db_1 = __importDefault(require("./Utilities/db"));
const environment_1 = __importDefault(require("./Utilities/environment"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_2 = __importDefault(require("./Utilities/swagger"));
const fastifySwaggerUi = require("@fastify/swagger-ui");
const content_index_1 = __importDefault(require("./ContentService/content.index"));
const server = (0, fastify_1.default)({ logger: true });
async function start() {
    await server.register(db_1.default);
    await server.register(auth_1.default);
    await server.register(swagger_1.default);
    await server.register(fastifySwaggerUi, swagger_2.default);
    await server.register(auth_index_1.default);
    await server.register(content_index_1.default);
    server.listen({ port: environment_1.default.PORT, host: "0.0.0.0" }, (error, address) => {
        if (error) {
            // Om error inte är null, då har vi ett fel.
            server.log.error({
                name: error.name,
                message: error.message,
                cause: error.cause,
                stack: error.stack,
            });
            process.exit(1);
        }
        server.swagger();
        console.log("=================================");
        console.log(`======= ENV: ${environment_1.default.NODE_ENV} =======`);
        console.log(`🚀 App listening on ${address}`);
        console.log("=================================");
    });
}
start();
