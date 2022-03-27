import {Seeder} from "@avanda/orm"
import BankAccount from "../models/BankAccount"
export default class implements Seeder{
    async run(faker: Faker.FakerStatic): Promise<void> {
        await new BankAccount().createBulk([
            {
                user_id: 1,
                bank_id: 14,
                account_number: "0246541842",
                account_name: "SULAIMAN ABDULSEMIU ADEWALE",
                flw_reference: 'hsdhstyu349idbedqgg'
            }
        ])
    }
}