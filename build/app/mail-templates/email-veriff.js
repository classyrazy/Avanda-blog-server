"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const mail = `<p>
    hello {{user.full_name}}, welcome to tyfarms.com, click the link below to verify your account<br>
    <a href="{{link}}">Click here to verify email</a>
</p>`;
exports.default = (0, base_1.default)(mail);
