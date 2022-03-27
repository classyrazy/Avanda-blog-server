"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminOnly {
    async boot(res, req) {
        try {
            let user = req.getAttrs('user');
            if (!user)
                return res.error('You are not logged in');
            if (user.type != 'admin')
                return res.error('You are not authorized to access this');
            return true;
        }
        catch (e) {
            console.log({ e });
            return res.error('You are not logged in');
        }
    }
}
exports.default = AdminOnly;
