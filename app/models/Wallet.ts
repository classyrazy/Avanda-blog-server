import {Column,Model} from "@avanda/orm";
import User from "./User";

export default class Wallet extends Model{

    id?: number

    @Column.decimal({
        masSize:[65,4]
    })
    balance?: number = 0

    @Column.int({
        references: new User()
    })
    user_id?: number

    @Column.decimal({
        masSize:[65,4]
    })
    holding_balance?: number = 0

    @Column.decimal({
        masSize:[65,4]
    })
    total_invested?: number = 0

    async updateUserWallet(user_id: number, amount: number, target: 'total_invested'|'balance'|'holding_balance' = 'balance'){
         // credit user wallet
         await new Wallet().ofUserId(user_id).increment(target,amount)
    }


}