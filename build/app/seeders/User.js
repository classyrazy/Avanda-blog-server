"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const app_1 = require("@avanda/app");
class default_1 {
    async run(faker) {
        await new User_1.default().create({
            email: faker.internet.email(),
            password: await app_1.Hash.make(faker.internet.password()),
        });
    }
}
exports.default = default_1;
