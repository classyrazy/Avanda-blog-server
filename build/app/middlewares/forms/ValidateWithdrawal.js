"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wallet_1 = __importDefault(require("../../models/Wallet"));
class default_1 {
    boot(res, req) {
        return req.validate((Rule) => ({
            amount: new Rule().required().custom(async (amount, key) => {
                let user_id = req.getAttrs('user_id');
                let wallet = await new Wallet_1.default().ofUserId(user_id).first();
                if (!wallet)
                    return "Sorry, we couldn't locate your wallet, please contact admin";
                amount = parseFloat(amount);
                if (amount < 0 || !amount)
                    return "Invalid amount";
                if (amount > wallet.balance)
                    return "Insufficient balance cover this amount";
                return true;
            }),
        }));
    }
}
exports.default = default_1;
