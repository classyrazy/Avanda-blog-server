import { Seeder } from "@avanda/orm";
import User from "../models/User";
import { Hash } from "@avanda/app";
export default class implements Seeder {
  async run(faker: Faker.FakerStatic): Promise<void> {
    await new User().create({
      email: faker.internet.email(),
      password: await Hash.make(faker.internet.password()),
    });
  }
}
