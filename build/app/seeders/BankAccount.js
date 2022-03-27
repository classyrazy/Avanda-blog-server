"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BankAccount_1 = __importDefault(require("../models/BankAccount"));
class default_1 {
    async run(faker) {
        await new BankAccount_1.default().createBulk([
            {
                user_id: 1,
                bank_id: 14,
                account_number: "0246541842",
                account_name: "SULAIMAN ABDULSEMIU ADEWALE",
                flw_reference: 'hsdhstyu349idbedqgg'
            }
        ]);
    }
}
exports.default = default_1;
