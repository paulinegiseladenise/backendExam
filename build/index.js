"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const auth_index_1 = __importDefault(require("./AuthService/auth.index"));
//en lista med vad man kan lägga in här finns på fastifys hemsida i deras dokumentation.
//denna const server är den enda fastifyinstansen. bara en enda instans som skickas till olika ställen.
const server = (0, fastify_1.default)({ logger: true });
const port = 3000;
async function start() {
    await server.register(auth_index_1.default);
    server.listen({ port: port, host: "0.0.0.0" }, (error, address) => {
        //om error inte är null så har vi ett fel.
        if (error) {
            server.log.error({
                name: error.name,
                message: error.message,
                cause: error.cause,
                stack: error.stack
            });
            process.exit(1);
        }
        console.log('=================================');
        console.log(`======= ENV: DEV =======`);
        console.log(`======= BASE_URL: ${address} =======`);
        console.log(`🚀 App listening on the port ${port}`);
        console.log('=================================');
    });
}
start();
