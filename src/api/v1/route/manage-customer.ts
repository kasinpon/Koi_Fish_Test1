import "reflect-metadata";
import checkToken from "../../../../middleware/checktoken";
import condition from "../../../../services/condition";
import customerInfo from "../../../model/Customer";
import tokenInfo from "../../../model/Token";
import tokenService from "../../../../services/tokenservices";
import accountService from "../../../../services/accountservice";
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
app.post('/login', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    if (condition.login(username, password)) {
            let result = await customerInfo.getInfoUser(username, password)
            if (result === undefined){
                res.status(400).json({
                    statusName: 'Login failed'
                })
            }else {
                let token = await tokenInfo.genTokenCustomers(result.username)
                if (!token) {
                    res.status(400).json({
                        statusName: 'Login failed'
                    })
                }
                res.status(200).json({
                    Authorization : token,
                    statusName: 'Login Success'
                })
            }
    } else {
        res.status(400).json({
            statusName: 'No username or password',
        })
    }
})

app.post('/register', async (req, res) => {
    let name = req.body.name
    let surname = req.body.surname
    let tel = req.body.tel
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    let address = req.body.address
    if (condition.register(email, username, password)) {
        let result = await customerInfo.register(name, surname, tel, email, username, password, address)
        if (!result) {
            res.status(400).json({
                statusName: 'Recording failed'
            })
        }else {
            let token = await tokenInfo.genTokenCustomers(username)
            let accountresult = await accountService.createAccount(username,password)
            if (!token || !accountresult) {
                res.status(400).json({
                    statusName: 'Recording failed'
                })
            }
            res.status(200).json({
                Authorization : token,
                statusName: 'Save successfully'
            })
        }
    } else {
        res.status(400).json({
            statusName: 'No email or username or password'
        })
    }
})

app.post('/logout',checkToken,async (req, res) => {
        if (await tokenService.deleteToken(req.headers['authorization']) === false){
            res.status(400).json({
                statusName: 'logout unsuccessful'
            })
        }
    res.status(200).json({
        statusName: 'logout successfull'
    })
})

export default app