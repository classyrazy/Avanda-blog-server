"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
const http_1 = require("@avanda/http");
const LoggedUsersOnly_1 = __importDefault(require("../middlewares/LoggedUsersOnly"));
const ValidateSignIn_1 = __importDefault(require("../middlewares/ValidateSignIn"));
const ValidateSignUp_1 = __importDefault(require("../middlewares/ValidateSignUp"));
class User extends http_1.Controller {
    async get(res, req) {
        var _a;
        console.log(req);
        return res.success("hello world", (_a = this.model) === null || _a === void 0 ? void 0 : _a.first());
    }
    async signin(res, req) {
        var _a;
        const { email, password } = req.data;
        const user = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.where({ email }).first());
        console.log(user);
        if (!user) {
            console.log("user not found");
            return res.error("User not found");
        }
        if (!(await app_1.Hash.verify(user.password, password))) {
            console.log("password not match");
            return res.error("Password is incorrect");
        }
        let token = null;
        let next = "/posts";
        token = await this.model.createSession(user.id);
        return res.success("Succefully logged in", { user, token, next });
    }
    async signup(res, req) {
        var _a;
        const user = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.create({
            email: req.getData("email"),
            password: await app_1.Hash.make(req.getData("password")),
            username: req.getData("username"),
        }));
        const emailToken = await app_1.Token.generate({ id: user.id, email: user.email }, "10min");
        //update the user's token
        await this.model.ofId(user.id).update({
            email_verification_token: emailToken,
        });
        const token = await this.model.createSession(user.id);
        const link = app_1.Env.get("BASE_URL") + "/verify-email?token=" + emailToken;
        // send token to user's gmail
        await app_1.Mail.send((msg) => {
            msg.from("avanda@blog.com");
            msg.subject("Verify your avandablog account!");
            msg.to(user.email);
            msg.htmlBody("Hello " +
                user.username +
                ", welcome to avandablog, click the link below to verify your account<br><a href=" +
                link +
                ">Click here to verify email</a>");
        }, {});
        // SEND TOKEN TO CLIENT TO CROSS CHECK
        return res.success("Registeration successful", {
            token,
            next: "/verify-email",
        });
    }
    async verifyEmail(res, req) {
        var _a;
        const { token } = req.data;
        console.log(token);
        try {
            let decodedToken = await app_1.Token.decode(token);
            const user = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.ofId(decodedToken.id).first());
            if (!user) {
                return res.error("Invalid token");
            }
            await this.model.ofId(user.id).update({
                email_verified: true,
                email_verification_token: null,
            });
            return res.success("Email verified", {
                next: "/login",
            });
        }
        catch (error) {
            return res.error(error.message);
        }
    }
    async checkIfVerified(res, req) {
        var _a;
        let isUserVerified = await (await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.ofId(req.getAttrs("user_id")).first())).email_verified;
        if (isUserVerified) {
            return res.success("verified");
        }
        return res.error("not verified");
    }
    async resendVerifyEmail(res, req) {
        try {
            const user = await req.getAttrs("user");
            console.log(user);
            if (!user) {
                return res.error("User not found");
            }
            const emailToken = await app_1.Token.generate({ id: user.id, email: user.email }, "10min");
            await this.model.ofId(user.id).update({
                email_verification_token: emailToken,
            });
            const link = app_1.Env.get("BASE_URL") + "/verify-email?token=" + emailToken;
            await app_1.Mail.send((msg) => {
                msg.from("avanda@blog.com");
                msg.subject("Verify your avandablog account!");
                msg.to(user.email);
                msg.htmlBody("Hello " +
                    user.username +
                    ", welcome to avandablog, click the link below to verify your account<br><a href=" +
                    link +
                    ">Click here to verify email</a>");
            }, {});
            return res.success("Email sent");
        }
        catch (error) {
            return res.error(error.message);
        }
    }
}
__decorate([
    (0, http_1.Get)()
], User.prototype, "get", null);
__decorate([
    (0, http_1.Post)(new ValidateSignIn_1.default())
], User.prototype, "signin", null);
__decorate([
    (0, http_1.Post)(new ValidateSignUp_1.default())
], User.prototype, "signup", null);
__decorate([
    (0, http_1.Post)()
], User.prototype, "verifyEmail", null);
__decorate([
    (0, http_1.Get)(new LoggedUsersOnly_1.default())
], User.prototype, "checkIfVerified", null);
__decorate([
    (0, http_1.Get)(new LoggedUsersOnly_1.default())
], User.prototype, "resendVerifyEmail", null);
exports.default = User;
