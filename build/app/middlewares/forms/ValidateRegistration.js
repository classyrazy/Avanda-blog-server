"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
class ValidateRegistration {
    async boot(res, req) {
        return req.validate((Rule) => ({
            email: new Rule().required().email().unique(new User_1.default()),
            password: new Rule().required().minLength(6),
            full_name: new Rule().required(),
            confirmPassword: new Rule()
                .required()
                .refs('password')
                .error('Confirm password must be same as password'),
        }));
    }
}
exports.default = ValidateRegistration;
