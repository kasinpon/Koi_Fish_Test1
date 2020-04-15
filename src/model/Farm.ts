import {getConnection} from "typeorm";
import {Customer} from "../entity/Customer";
import {Farm} from "../entity/Farm";

let farmInfo = {
    create : async (name,address,description,user_id) => {
        try {
            let farm = new Farm()
            farm.name = name
            farm.address = address
            farm.description = description
            farm.status = true
            farm.customer = await getConnection().getRepository(Customer).findOne({id:user_id})
            await getConnection().getRepository(Farm).save(farm)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
    edit : async (name,address,description,farm_id) => {
        try {
            let farm = await getConnection().getRepository(Farm).findOne({id: farm_id})
            // console.log(farm)
            farm.name = name
            farm.address = address
            farm.description = description
            await getConnection().getRepository(Farm).save(farm)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
    showinfo : async (customer_id,farm_id) => {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .select(["farm.name","farm.address","farm.description"])
                .from(Farm, "farm")
                .innerJoin("farm.customer", "customer")
                .where("customer.id = :customer_id and farm.id = :farm_id" , {customer_id:customer_id,farm_id:farm_id})
                .getRawOne();
            return JSON.parse(JSON.stringify(result))
        } catch (err) {
            console.log(err)
            return false
        }
    },
    showall : async (customer_id) => {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .select(["farm.id","farm.name"])
                .from(Farm, "farm")
                .innerJoin("farm.customer", "customer")
                .where("customer.id = :customer_id and farm.status = true", {customer_id:customer_id})
                .getMany();
            return JSON.parse(JSON.stringify(result))
        } catch (err) {
            console.log(err)
            return false
        }
    },
    delete : async (farm_id) => {
    try {
        let farm = await getConnection().getRepository(Farm).findOne({id: farm_id})
        farm.status = false
        await getConnection().getRepository(Farm).save(farm)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
},
}

export default farmInfo