import {getConnection} from "typeorm";
import {Customer} from "../entity/Customer";

let customerInfo = {
    getInfoUser : async (username,password) => {
        try {
            // const data = await getConnection()
            //     .createQueryBuilder()
            //     .select("surname")
            //     .from(Customer, "customer")
            //     .where("customer.username = :username and customer.password = :password", {username: username, password: password})
            //     .execute();
            const data = await getConnection()
                .createQueryBuilder(Customer,"customer")
                .where("customer.username = :username or customer.email = :username  and customer.password = :password", {username: username, password: password})
                .getOne();
            //  let userinfo = await getConnection().getRepository(Customer).findOne({username:username,password:password})
            return data
        } catch (err) {
            console.log(err)
        }
    },
    register : async (name,surname,tel,email,username,password,address) => {
        try {
                 await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Customer)
                .values([
                    { name: name, surname: surname, tel: tel, email: email, username: username, password: password, address: address },
                ])
                .execute();
                 return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

export default customerInfo