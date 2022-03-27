"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
const database_1 = __importDefault(require("./database"));
const app_2 = require("@avanda/app");
const config = {
    connection: (0, app_1.Connection)(database_1.default),
    port: app_2.Env.get('PORT', 8000),
    rootPath: '/',
    CORSWhitelist: app_2.Env.get('CORS_WHITELIST', "http://localhost:3000,http://localhost:4000,http://localhost:9000,http://localhost:3001").split(',')
};
exports.default = config;
