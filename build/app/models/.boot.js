"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("./Address"));
const Bank_1 = __importDefault(require("./Bank"));
const BankAccount_1 = __importDefault(require("./BankAccount"));
const Blog_1 = __importDefault(require("./Blog"));
const User_1 = __importDefault(require("./User"));
const Wallet_1 = __importDefault(require("./Wallet"));
exports.default = {
    Address: Address_1.default,
    Bank: Bank_1.default,
    BankAccount: BankAccount_1.default,
    Blog: Blog_1.default,
    User: User_1.default,
    Wallet: Wallet_1.default,
};
