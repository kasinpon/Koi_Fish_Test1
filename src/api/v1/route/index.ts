import * as express from 'express'
let route = express.Router()
// import  Matching   from "./Matching"

import customer from "./manage-customer"
import farm from "./manage-farming"

route.get('/',(req, res)=>{
  res.send("Access denied!");
});

route.use('/customer',customer)
route.use('/farm',farm)


export default route
