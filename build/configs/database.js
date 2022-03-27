"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
const config = {
    dbDialect: 'mysql',
    dbName: app_1.Env.get('DB_NAME', 'test'),
    dbPassword: app_1.Env.get('DB_PASSWORD', ''),
    dbUser: app_1.Env.get('DB_USER', 'root'),
};
exports.default = config;
