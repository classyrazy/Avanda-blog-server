"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("@avanda/orm");
const app_1 = require("@avanda/app");
class User extends orm_1.Model {
    constructor() {
        super(...arguments);
        this.email_verified = false;
        this.is_loggedin = false;
    }
    async getActiveSession(req) {
        let token = req.getHeader("authorization").split(" ")[1];
        return await app_1.Token.decode(token);
    }
    async createSession(user_id) {
        return await app_1.Token.generate({ user_id });
    }
}
__decorate([
    orm_1.Column.text({
        unique: true,
        masSize: 255,
    })
], User.prototype, "email", void 0);
__decorate([
    orm_1.Column.text()
], User.prototype, "password", void 0);
__decorate([
    orm_1.Column.text()
], User.prototype, "username", void 0);
__decorate([
    orm_1.Column.text({
        nullable: true,
    })
], User.prototype, "email_verification_token", void 0);
__decorate([
    orm_1.Column.boolean()
], User.prototype, "email_verified", void 0);
__decorate([
    orm_1.Column.boolean()
], User.prototype, "is_loggedin", void 0);
__decorate([
    orm_1.Column.text({
        nullable: true,
    })
], User.prototype, "picture", void 0);
exports.default = User;
