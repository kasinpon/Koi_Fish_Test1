import {getConnection} from "typeorm";
import {TokenCustomer} from "../entity/TokenCustomer";
import tokenService from "../../services/tokenservices";
import {Customer} from "../entity/Customer";

let tokenInfo = {
    genTokenCustomers : async (username_customer) => {
        let token = tokenService.getAccessToken()
        try {
            let tokencustomer = new TokenCustomer()
            tokencustomer.Authorization = token
            tokencustomer.exprire = tokenService.getExpireAccessToken()
            tokencustomer.customer = await getConnection().getRepository(Customer).findOne({username:username_customer})
            await getConnection().getRepository(TokenCustomer).save(tokencustomer)
            return token
        } catch (err) {
            console.log(err)
            return false
        }
    },
    checkExprire : async (token) => {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .select("tokencustomer.exprire")
                .from(TokenCustomer, "tokencustomer")
                .where("tokencustomer.Authorization = :token", {token:token})
                .getRawOne();
            return JSON.parse(JSON.stringify(result)).tokencustomer_exprire
        }catch (e) {
            console.log(e)
            return false
        }
    },
    checkInfoCustomers : async (token) => {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .select("customer.id")
                .from(Customer, "customer")
                .innerJoin("customer.tokencustomer", "token")
                .where("token.Authorization = :token", {token:token})
                .getRawOne();
            return JSON.parse(JSON.stringify(result)).customer_id
        }catch (e) {
            console.log(e)
            return false
        }
    },
    deleteCustomersToken : async (token) =>{
        try {
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(TokenCustomer)
                .where("Authorization = :token", { token: token })
                .execute();
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

}

export default tokenInfo