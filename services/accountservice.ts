import accountInfo from "../src/model/Account";
import customerInfo from "../src/model/Customer";

let accountService = {
    createAccount:async (username,password) => {
        let datauser = await customerInfo.getInfoUser(username,password)
        let result = await accountInfo.createinfo(datauser.id)
        return result
    }
}

export default accountService