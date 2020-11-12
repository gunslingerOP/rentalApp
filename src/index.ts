import config from "../config/index";
import * as express from "express";
import { Connection, createConnection } from "typeorm";
const app = express();
import * as cors from "cors"
const port = process.env.PORT || 3000;
import v1 from "../route/app/v1";
import { Invoice } from "./entity/invoice";
import { Property } from "./entity/property";
var cron = require("node-cron");

createConnection().then(async (connection) => {
  app.use(express.json());
  app.use(cors());

  app.use("/v1", v1);
  cron.schedule(" 0 0 * * *", async () => {
    let invoice: any;
    let property: any;
    invoice = await Invoice.find({
      where: { Host_paid_status: false, paid_status: true },
    });

    property = await Property.find({
      where: { id: invoice.propertyId, booked: true },
    });
    let d = new Date();

    let date = d.getDate();
    let month = d.getMonth() + 1;
    invoice.map(async (el) => {
      if (el.endDay == date && el.endMonth == month) {
        el.Host_paid_status = true;
        await el.save();
        property.map(async (prop) => {
          prop.booked = false;
          await prop.save();
        });
      }
    });
  });
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
