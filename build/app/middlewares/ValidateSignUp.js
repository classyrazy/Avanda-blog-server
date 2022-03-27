"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class ValidateSignUp {
    boot(res, req) {
        return req.validate((Rule) => ({
            email: new Rule().required().email().unique(new User_1.default()),
            username: new Rule().required().minLength(5),
            password: new Rule().required().minLength(6),
            confirmPassword: new Rule()
                .required()
                .refs("password")
                .error("Confirm password must match password")
        }));
    }
}
exports.default = ValidateSignUp;
