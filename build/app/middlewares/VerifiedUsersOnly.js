"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class VerifiedUsersOnly {
    async boot(res, req) {
        try {
            let session = await new User_1.default().getActiveSession(req);
            req.setAttr('user_id', session.user_id);
            let user = await new User_1.default().find(session === null || session === void 0 ? void 0 : session.user_id);
            if (!user)
                throw new Error('you are not logged in');
            else if (!user.email_verified)
                throw new Error('you are not verified');
            req.setAttr('user', user);
            return !!user.email_verified;
        }
        catch (e) {
            return res.error('You are not Verified');
        }
    }
}
exports.default = VerifiedUsersOnly;
