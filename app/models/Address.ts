import {Column,Model} from "@avanda/orm";
import User from "./User";

export default class Address extends Model{
    @Column.int({
        references: new User(),
    })
    user_id?: number

    @Column.text()
    state?: string

    @Column.text()
    city?: string

    @Column.text()
    street_address?: string

    @Column.text({
        nullable: true
    })
    zip_code?: string

    @Column.text()
    owner_name?: string

    @Column.text()
    owner_phone_number?: string

    @Column.text()
    label?: string



}