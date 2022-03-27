"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appInstance = void 0;
const http_1 = require("@avanda/http");
const app_1 = require("@avanda/app");
const _boot_1 = __importDefault(require("./models/.boot"));
const _boot_2 = __importDefault(require("./controllers/.boot"));
const server_1 = __importDefault(require("../configs/server"));
async function boot() {
    const app = await new http_1.Query(server_1.default)
        .execute(_boot_1.default, _boot_2.default);
    console.log({ env: app_1.Env.get('NODE_ENV') });
    if (app_1.Env.get('NODE_ENV') === 'development') {
        return app.getServerInstance();
    }
    else {
        app.listen();
    }
}
exports.appInstance = boot();
