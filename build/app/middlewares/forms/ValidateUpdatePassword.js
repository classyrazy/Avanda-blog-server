"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateUpdatePassword {
    async boot(res, req) {
        return req.validate((Rule) => ({
            password: new Rule().required(),
            new_password: new Rule()
                .required()
                .error('New password required')
                .minLength(6)
                .error('New password must be at least 6 characters'),
            re_new_password: new Rule()
                .required()
                .error('Retyped new password required')
                .refs('new_password')
                .error('Retype password must be same as new password'),
        }));
    }
}
exports.default = ValidateUpdatePassword;
