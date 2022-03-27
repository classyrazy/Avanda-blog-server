"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("../models/Address"));
class default_1 {
    async run(faker) {
        await new Address_1.default().createBulk([
            {
                city: 'Ilobu',
                state: 'osun',
                street_address: 'Omigade street, ogooluwa',
                user_id: 1,
                zip_code: '888',
                owner_phone_number: faker.phone.phoneNumber(),
                label: 'Home',
                owner_name: faker.name.findName()
            }
        ]);
    }
}
exports.default = default_1;
