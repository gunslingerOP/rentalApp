import * as bcrypt from "bcrypt";
const accountSid = "AC8621faf794d2739317c940715c8736f2";
const authToken = "327dc418c0dbb698fcaa62884e1a9e04";
import * as twilio from "twilio";
const client = twilio(accountSid, authToken);
/**
 * @param res
 * @param err
 * @param statusCode
 */

const errRes = (res, err, statusCode = 400) => {
  let response = { status: false, err };
  res.statusCode = statusCode;
  return res.json(response);
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
    .create({ body, from: "+964 770 534 4322", to })
    .then((message) => console.log(message.sid));
};

export { okRes, errRes, getOTP, hashMyPassword, comparePassword, sendSMS };
