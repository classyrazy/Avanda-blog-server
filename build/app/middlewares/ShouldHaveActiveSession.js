"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class ShouldHaveActiveSession {
    async boot(res, req) {
        try {
            let session = await new User_1.default().getActiveSession(req);
            req.setAttr('user_id', session.user_id);
            let user = await new User_1.default().find(session === null || session === void 0 ? void 0 : session.user_id);
            if (!user)
                throw new Error('you are not logged in');
            req.setAttr('user', user);
            return !!(session === null || session === void 0 ? void 0 : session.user_id) && !!user;
        }
        catch (e) {
            return res.error('Couldn\'t find any active session');
        }
    }
}
exports.default = ShouldHaveActiveSession;
