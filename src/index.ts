import config from "../config/index";
import * as express from "express";
import { Connection, createConnection } from "typeorm";
const app = express();
const port = config.port || 4000;
import v1 from "../route/app/v1";
import { Invoice } from "./entity/invoice";
var cron = require("node-cron");

createConnection().then(async (connection) => {
  app.use(express.json());

  
  app.use("/v1", v1);
  cron.schedule(" 0 0 * * *",async () => {
      let invoice:any;

      invoice = await Invoice.find({
          where:{Host_paid_status:false, paid_status:true}
      })

      let  d = new Date();
      
      let  date = d.getDate();
      let  month = d.getMonth() + 1; 
      invoice.map(async (el)=>{
          if(el.endDay == date && el.endMonth == month){
              el.Host_paid_status = true
              await el.save()
              console.log(`done`)
             
          }
      })
  });
  const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
