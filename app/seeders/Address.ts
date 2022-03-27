import {Seeder} from "@avanda/orm"
import Address from "../models/Address"
export default class implements Seeder{
    async run(faker: Faker.FakerStatic): Promise<void> {
        await new Address().createBulk([
            {
                city:'Ilobu',
                state:'osun',
                street_address:'Omigade street, ogooluwa',
                user_id: 1,
                zip_code: '888',
                owner_phone_number: faker.phone.phoneNumber(),
                label: 'Home',
                owner_name: faker.name.findName()
            }
        ])
    }
}