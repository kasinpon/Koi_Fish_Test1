import "reflect-metadata";
import checkToken from "../../../../middleware/checktoken";
import condition from "../../../../services/condition";
import farmInfo from "../../../model/Farm";
import tokenInfo from "../../../model/Token";
let express = require("express")
let bodyParser = require("body-parser")
let app = express.Router()
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,accesstoken");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/create',checkToken,async (req, res) => {
    let customer_id = await tokenInfo.checkInfoCustomers(req.headers['authorization'])
    if (!customer_id){
        res.status(400).json({
            statusName: 'Cannot find information'
        })
    }
    if (!condition.farmname(req.body.name)){
        res.status(400).json({
            statusName: '์No farm name'
        })
    }
    if (await farmInfo.create(req.body.name,req.body.address,req.body.description,customer_id ) === false) {
        res.status(400).json({
            statusName: '์Recording failed'
        })
    }
    res.status(200).json({
        statusName: '์Recording successfull'
    })


})

app.post('/edit',checkToken,async (req, res) => {
    let customer_id = await tokenInfo.checkInfoCustomers(req.headers['authorization'])
    if (!customer_id){
        res.status(400).json({
            statusName: 'Cannot find information'
        })
    }
    let farm_id = req.body.farm_id
    let name = req.body.name
    let address = req.body.address
    let description = req.body.description
    if ( !condition.farmnid(farm_id) || !condition.farmname(name) ){
        res.status(400).json({
            statusName: 'edit failed'
        })
    }else {
        let farmdata = await farmInfo.showinfo(customer_id,farm_id)
        if (!farmdata){
            res.status(400).json({
                statusName: 'You do not have permission to delete.'
            })
        }else {
            if (await farmInfo.edit(name,address,description,farm_id) === false) {
                res.status(400).json({
                    statusName: '์Recording failed'
                })
            }
            res.status(200).json({
                statusName: 'edit successfull'
            })
        }
    }

})

app.get('/lists',checkToken,async (req, res) => {
    let customer_id = await tokenInfo.checkInfoCustomers(req.headers['authorization'])
    if (!customer_id){
        res.status(400).json({
            statusName: 'Cannot find information'
        })
    }
    let farmlist = await farmInfo.showall(customer_id)
    res.status(200).json({
        statusName: 'success',
        farmlist: farmlist
    })
})

app.post('/info',checkToken,async (req, res) => {
    let customer_id = await tokenInfo.checkInfoCustomers(req.headers['authorization'])
    if (!customer_id){
        res.status(400).json({
            statusName: 'Cannot find information'
        })
    }
    let farm_id = req.body.farm_id
    if (!condition.farmnid(farm_id)){
        res.status(400).json({
            statusName: 'No farm_id'
        })
    }
    let farmdata = await farmInfo.showinfo(customer_id,farm_id)
    res.status(200).json({
        statusName: 'success',
        farmdata: farmdata
    })
})

app.post('/delete',checkToken,async (req, res) => {
    let customer_id = await tokenInfo.checkInfoCustomers(req.headers['authorization'])
    if (!customer_id){
        res.status(400).json({
            statusName: 'Cannot find information'
        })
    }
    let farm_id = req.body.farm_id
    if (!condition.farmnid(farm_id)){
        res.status(400).json({
            statusName: 'No farm_id'
        })
    }
    let farmdata = await farmInfo.showinfo(customer_id,farm_id)
    if (!farmdata){
        res.status(400).json({
            statusName: 'You do not have permission to delete.'
        })
    }else {
        let result = await farmInfo.delete(farm_id)
        if (!result){
            res.status(400).json({
                statusName: 'Failed to delete'
            })
        }
        res.status(200).json({
            statusName: 'Successfully deleted',
        })
    }
})
export default app