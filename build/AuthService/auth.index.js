"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = require("./auth.routes");
async function AuthService(server, options) {
    await server.register(auth_routes_1.AuthRoutes);
}
exports.default = AuthService;
