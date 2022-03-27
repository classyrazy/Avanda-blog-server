import {Column,Model} from "@avanda/orm";

export default class Bank extends Model{
    id?: number


    @Column.text({
        masSize: 20,
    })
    code?:string;

    @Column.text({
        masSize: 100
    })
    name?:string;

    @Column.text({
        masSize: 10,
        nullable: true
    })
    alias?:string;

    @Column.text()
    reference?:string;
}