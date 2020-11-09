import config  from '../config/index'
import * as express from 'express'
import {Connection, createConnection} from 'typeorm'
const app=express()
const port =  config.port || 4000
import v1 from "../route/app/v1"


createConnection().then(async (connection)=>{
app.use(express.json())


app.use('/v1', v1);

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
})

})