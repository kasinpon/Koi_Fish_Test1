import {getConnection} from "typeorm";
import {Customer} from "../entity/Customer";
import {Account} from "../entity/Account";

let accountInfo = {
    createinfo : async (user_id) => {
        try {
            let account = new Account()
            account.customer = await getConnection().getRepository(Customer).findOne({id:user_id})
            account.status = true
            await getConnection().getRepository(Account).save(account)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

export default accountInfo