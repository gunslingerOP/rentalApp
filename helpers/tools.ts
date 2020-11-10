import * as bcrypt from "bcrypt";
import config from "../config/index";

const accountSid = "AC8621faf794d2739317c940715c8736f2";
const authToken = config.twilioAuth;
import * as twilio from "twilio";
import { error } from "console";
const client = twilio(accountSid, authToken);
/**
 * @param res
 * @param err
 * @param statusCode
 */

const errRes = (res, err, statusCode = 400) => {
  let response = { status: false, err };
  res.statusCode = statusCode;
  return res.json(response) 
  
};

const okRes = (res, data, statusCode = 200) => {
  let response = { status: true, data };
  res.statusCode = statusCode;
  return res.json(response);
};
const getOTP = () => Math.floor(1000 + Math.random() * 9000);
const hashMyPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(plainPassword, salt);
  return password;
};

const comparePassword = async (plainPassword, hash) =>
  await bcrypt.compare(plainPassword, hash);

const sendSMS = (body: string, to: string) => {
  client.messages
    .create({ body, from: "+19419993310", to })
    .then((message) => console.log(message)).catch(error);
};

const paginate = ( p = 1, s = 10)=>{
  let take = s
  let skip = s*(p-1)
  return {take, skip}
}

export { okRes, errRes, getOTP, hashMyPassword, comparePassword, sendSMS, paginate };
