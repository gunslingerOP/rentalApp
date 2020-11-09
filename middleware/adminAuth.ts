import { errRes } from "../helpers/tools";
import { User } from "../src/entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/index";
import { Admin } from "../src/entity/admins";

let AdminAuthenticate: any;
export default AdminAuthenticate = async (req, res, next): Promise<object> => {
  let payload: any;
  const token = req.headers.token;

  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return errRes(res, `token is not valid`);
  }
  let admin = await Admin.findOne({
    where: { id: payload.id },
  });
  if (!admin) return errRes(res, `no admin found`);
  req.admin = admin;

  return next();
};
