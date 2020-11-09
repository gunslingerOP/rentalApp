require("dotenv").config();

let config: any;
export default config = {
  jwtSecret: process.env.JWT_SECRET ,
  zcSecret: process.env.ZC_SECRET || "shhh",
  zcMsisdn: process.env.ZC_MSISDN || "",
  zcProduction: process.env.ZC_PRODUCTION || false,
  zcMerchant: process.env.ZC_MERCHANT || "",
  twilioAuth: process.env.TWILIO_AUTH,
  port: process.env.PORT 
};