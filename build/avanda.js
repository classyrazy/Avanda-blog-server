#! /usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = __importDefault(require("@avanda/cli"));
const _boot_1 = __importDefault(require("./app/models/.boot"));
const _boot_2 = __importDefault(require("./app/seeders/.boot"));
const _boot_3 = __importDefault(require("./app/commands/.boot"));
const app_1 = require("@avanda/app");
const database_1 = __importDefault(require("./configs/database"));
async function boot() {
    return (0, cli_1.default)(_boot_3.default, _boot_1.default, _boot_2.default, await (0, app_1.Connection)(database_1.default));
}
boot();
