import { Hash } from '@avanda/app';
import {Seeder} from "@avanda/orm"
import Post from "../models/Blog"
export default class implements Seeder{
    async run(faker: Faker.FakerStatic): Promise<void> {
        new Post().createBulk([
            /*Create multiple data here*/
            await new Post().create({
                post_id: await Hash.random(6, false),
                user_id: 1,
                author: faker.name.firstName(),
                title: faker.lorem.sentence(15),
                content: faker.lorem.paragraph(350),
                category: 'Technology',
                post_image: faker.image.imageUrl(),
                tags: [faker.lorem.word(),faker.lorem.word()],
                
              }),

            await new Post().create({
                post_id: await Hash.random(6, false),
                user_id: 1,
                author: "Adewale Ayomide",
                title: "How to use the new Avanda Framework",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                post_image: faker.image.imageUrl(),
                category: 'Web development',
                tags: ["avanda", "framework", "javascript"],
                
            })


        ])
    }
}