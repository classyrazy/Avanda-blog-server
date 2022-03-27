import {Column,Model} from "@avanda/orm";
import User from "./User";
import Bank from "./Bank";

export default class BankAccount extends Model{
    id?: number
    @Column.int({
        references: new User()
    })
    user_id?: number

    @Column.int({
        references: new Bank()
    })
    bank_id?: number

    @Column.text()
    account_number?: string

    @Column.text()
    account_name?: string

    @Column.text({
        masSize: 225
    })
    flw_reference?: string

}