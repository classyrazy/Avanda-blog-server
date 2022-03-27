"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const mail = `<p>
    hello {{user.full_name}}, you have requested to retrieve your password, click the link below to change your password<br>
    <a href="{{link}}">Click here to verify email</a>
    <br>
    <br>
    Kindly ignore this email if you didn't initiate this action and reply this email to report to admin
</p>`;
exports.default = (0, base_1.default)(mail);
