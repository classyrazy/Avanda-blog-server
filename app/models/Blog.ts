import User from '../models/User';
import {Column,Model} from "@avanda/orm";

export default class Blog extends Model{
    id?: number;

    @Column.int({
        references: new User()
    })
    user_id?: number;

    @Column.text()
    post_id?: string;


    @Column.text()
    author?:string;

    @Column.text()
    title?:string;

    @Column.text()
    content?:string;

    @Column.text()
    post_image?:string;

    @Column.json({
        nullable:true
    })
    tags?:string[];

    @Column.text({
        nullable:true
    })
    category?:string;
}