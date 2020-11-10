import config from "../config/index";
import * as express from "express";
import { Connection, createConnection } from "typeorm";
const app = express();
const port = config.port || 4000;
import v1 from "../route/app/v1";
import { Invoice } from "./entity/invoice";
import { okRes } from "../helpers/tools";

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

  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
