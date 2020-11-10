import config from "../config/index";
import * as express from "express";
import { Connection, createConnection } from "typeorm";
const app = express();
const port = config.port || 4000;
import v1 from "../route/app/v1";
import { Invoice } from "./entity/invoice";
var cron = require("node-cron");
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
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
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
