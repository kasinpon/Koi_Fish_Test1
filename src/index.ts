import "reflect-metadata";
import * as express from 'express'
let server = express()
import routeV1 from './api/v1/route'
import {createConnection,getConnection} from "typeorm";
createConnection().then(async connection => {
    const cors = require('cors');

    const PORT = process.env.APP_PORT || 8080;
    /* Fixed none Authorization CORS*/
    server.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,accesstoken");
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    server.use(cors());
    /* Fixed none Authorization CORS*/

    server.get('/',(req, res)=>{
        res.send("Access denied!")
    })
    server.use('/api/v1',routeV1)

    server.listen(PORT, () => {
        console.log('Server running:' + PORT);
    })

})

    

