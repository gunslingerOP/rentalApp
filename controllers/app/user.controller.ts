import * as validate from "validate.js";
import validator from "../../helpers/validate.helper";
import { User } from "../../src/entity/User"
import PhoneFormat from "../../helpers/phone.helper";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { okRes, errRes, getOTP, hashMyPassword, comparePassword, sendSMS } from "../../helpers/tools";

export default class UserController {
  /**
   * @params
   */
  static async register(req: Request, res: Response): Promise<object> {
    let notValid = validate(req.body, validator.register());
    if (notValid) return errRes(res, notValid);
    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not valid`);
    let phone = phoneObj.globalP;
    let user: any;
    try {
      user = await User.findOne({ where: { phone } });
      if (user) {
        if (user.complete)
          return errRes(res, `Phone ${req.body.phone} already exists`);
        const token = jwt.sign({ id: user.id }, "secretStuff");
        user.otp = getOTP();
        await user.save();
        user.password = null;
        user.otp = null;
        return okRes(res, { data: { user, token } });
      }
    } catch (error) {
      return errRes(res, error);
    }
    const password = await hashMyPassword(req.body.password);
    user = await User.create({
      ...req.body,
      active: true,
      verified: false,
      isOwner:false,
      otp: getOTP(),
      password,
      phone,
    });
    await user.save();
    user.password = null;
    sendSMS(`Your OTP: ${user.otp}`, user.phone)
    user.otp = null;
    const token = jwt.sign({ id: user.id }, "this is a secret");
    return okRes(res, { data: { user, token } });
  }
}
