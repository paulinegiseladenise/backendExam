"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __importDefault(require("./environment"));
const swaggerOptions = {
    routePrefix: "/documentation",
    exposeRoute: true,
    openapi: {
        openapi: "3.0.3",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                },
            },
        },
    },
    swagger: {
        info: {
            title: "Journal Backend Service",
            description: "The backend server for the journal app",
            version: "1.0.0",
        },
        securityDefinitions: {
            Authorization: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
        host: `localhost:${environment_1.default.PORT}`,
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
    },
};
exports.default = swaggerOptions;
