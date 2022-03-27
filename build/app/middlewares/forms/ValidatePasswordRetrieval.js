"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
class ValidatePasswordRetrieval {
    boot(res, req) {
        return req.validate((Rule) => ({
            email: new Rule().required().email().exists(new User_1.default()).error('Email not recognized'),
        }));
    }
}
exports.default = ValidatePasswordRetrieval;
