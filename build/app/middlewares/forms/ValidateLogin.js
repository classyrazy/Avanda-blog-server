"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateLogin {
    boot(res, req) {
        return req.validate((Rule) => ({
            email: new Rule().required().email(),
            password: new Rule().required().custom((val, key) => {
                if (val.length < 6) {
                    return "Password must be at least 6 characters";
                }
                return true;
            })
        }));
    }
}
exports.default = ValidateLogin;
