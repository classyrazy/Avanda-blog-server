"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
const Blog_1 = __importDefault(require("../models/Blog"));
class default_1 {
    async run(faker) {
        new Blog_1.default().createBulk([
            /*Create multiple data here*/
            await new Blog_1.default().create({
                post_id: await app_1.Hash.random(6, false),
                user_id: 1,
                author: faker.name.firstName(),
                title: faker.lorem.sentence(15),
                content: faker.lorem.paragraph(350),
                category: 'Technology',
                post_image: faker.image.imageUrl(),
                tags: [faker.lorem.word(), faker.lorem.word()],
            }),
            await new Blog_1.default().create({
                post_id: await app_1.Hash.random(6, false),
                user_id: 1,
                author: "Adewale Ayomide",
                title: "How to use the new Avanda Framework",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                post_image: faker.image.imageUrl(),
                category: 'Web development',
                tags: ["avanda", "framework", "javascript"],
            })
        ]);
    }
}
exports.default = default_1;
