import * as validate from "validate.js";
import validator from "../../helpers/validate.helper";
import { User } from "../../src/entity/User";
import PhoneFormat from "../../helpers/phone.helper";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
  okRes,
  errRes,
  getOTP,
  hashMyPassword,
  comparePassword,
  sendSMS,
} from "../../helpers/tools";
import config from "../../config/index";
import { error } from "console";
import { Property } from "../../src/entity/property";
import { Invoice } from "../../src/entity/invoice";
import { Review } from "../../src/entity/review";
import { PropertyImage } from "../../src/entity/propertyImages";
import { ReviewImage } from "../../src/entity/reviewImage";
import { Notification } from "../../src/entity/notifications";
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
    let email: any;

    try {
      user = await User.findOne({ where: { phone } });
      email = await User.findOne({ where: { email: req.body.email } });

      if (email) return errRes(res, `this email already exists`);
      if (user) {
        if (user.verified)
          return errRes(res, `Phone ${req.body.phone} already exists`);

        const token = jwt.sign({ id: user.id }, config.jwtSecret);
        user.OTP = getOTP();
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
      isOwner: false,
      OTP: getOTP(),
      password,
      phone,
    });
    await user.save();
    user.password = null;
    sendSMS(`Your OTP: ${user.OTP}`, user.phone);

    user.OTP = null;
    const token = jwt.sign({ id: user.id }, config.jwtSecret);
    return okRes(res, { data: { user, token } });
  }

  static async verify(req: Request, res: Response): Promise<Object> {
    let notValid = validate(req.body, validator.verify());
    if (notValid) return errRes(res, notValid);
    let user: any;
    let payload: any;
    const token = req.headers.token;
    try {
      payload = jwt.verify(token, config.jwtSecret);
    } catch (error) {
      return errRes(res, "Invalid token");
    }
    user = await User.findOne({ where: { id: payload.id } });
    try {
      if (user.verified)
        return errRes(res, `Your account has already been verified`);
      if (user) {
        user.verified = true;
        await user.save();
      }
      if (user.OTP != req.body.OTP) {
        user.OTP = getOTP();
        user.save();
        return errRes(
          res,
          `You entered an incorrect OTP, get another number at the registration`
        );
      }
    } catch (error) {
      return errRes(res, error);
    }
    user.OTP = getOTP();
    user.save();
    return okRes(res, `Your account has been verified`);
  }
  static async login(req: Request, res: Response): Promise<Object> {
    let notValid = validate(req.body, validator.login());
    if (notValid) return errRes(res, notValid);

    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not valid`);
    let phone = phoneObj.globalP;
    let token: any;
    let user: any;
    try {
      user = await User.findOne({
        where: [{ phone }, { email: req.body.email }],
      });
      let validPassword = await comparePassword(
        req.body.password,
        user.password
      );
      if (validPassword) {
        token = jwt.sign({ id: user.id }, config.jwtSecret);
      }
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, { data: `Login successful, your token is ${token}` });
  }

  static async sendReset(req, res): Promise<object> {
    let notValid = validate(req.body, validator.sendReset());
    if (notValid) return errRes(res, notValid);

    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not valid`);
    let phone = phoneObj.globalP;

    let user = req.user;

    try {
      user.resetotp = getOTP();
      await user.save();
      let resetOTP = user.resetotp;
      sendSMS(`Your reset OTP: ${resetOTP}`, user.phone);
    } catch (error) {
      errRes(res, error);
    }
    return okRes(res, `a reset OTP has been sent to your number`);
  }

  static async resetPassword(req, res): Promise<object> {
    let notValid = validate(req.body, validator.resetPassword());
    if (notValid) return errRes(res, notValid);

    let user = req.user;

    if (user.resetotp != req.body.otp) {
      user.resetotp = getOTP();
      return errRes(res, `You entered a wrong OTP, please get a new one sent`);
    }

    if (user.resetotp == req.body.otp) {
      user.password = req.body.newPassword;
      user.resetotp = getOTP();
      await user.save();
    }
    return okRes(res, `Your password has been reset`);
  }

  static async becomeHost(req, res): Promise<object> {
    let user = req.user;

    user.isOwner = true;
    await user.save();
    return okRes(res, `Congragulations! You have become a host`);
  }

  static async addPropertyImage(req, res): Promise<object> {
    let isNotValid = validate(req.body, validator.addPropertyImage());
    if (isNotValid) return errRes(res, isNotValid);

    let newImage: any;
    try {
      newImage = await PropertyImage.create({
        ...req.body,
      });
      await newImage.save();
    } catch (error) {
      return errRes(res, error);
    }

    return okRes(res, `image added successfully`);
  }

  static async addReviewImage(req, res): Promise<object> {
    let isNotValid = validate(req.body, validator.addReviewImage());
    if (isNotValid) return errRes(res, isNotValid);

    let newImage: any;
    try {
      newImage = await ReviewImage.create({
        ...req.body,
      });
      await newImage.save();
    } catch (error) {
      return errRes(res, error);
    }

    return okRes(res, `image added successfully`);
  }

  static async postProperty(req, res): Promise<Object> {
    let isNotValid = validate(req.body, validator.postProperty());
    if (isNotValid) return errRes(res, isNotValid);

    let user = req.user;
    let property: any;
    if (!user.isOwner) return errRes(res, `please activate your host status`);

    try {
      property = await Property.create({
        ...req.body,
        ownerid: user.id,
        booked: false,
      });
      await property.save();
    } catch (error) {
      return errRes(res, error);
    }

    return okRes(res, `Property listed successfully`);
  }

  static async postReview(req, res): Promise<Object> {
    let isNotValid = validate(req.body, validator.postReview());
    if (isNotValid) return errRes(res, isNotValid);
    let invoiceStatus: any;
    let user = req.user;
    let review: any;
    invoiceStatus = await Invoice.findOne({
      where: { user_id: user.id, has_reviewed: false, paid_status: true },
    });
    if (user.id == invoiceStatus.landlord_id)
      return errRes(res, `You can't put reviews of your own properties!`);
    if (!invoiceStatus)
      return errRes(
        res,
        `You must use the place and pay the bill to review it`
      );
    invoiceStatus.has_reviewed = true;
    invoiceStatus.save();
    try {
      review = await Review.create({
        ...req.body,
        tenant_id: user.id,
      });
    } catch (error) {
     return errRes(res, error);
    }
    return okRes(res, `Review successfully submitted`);
  }

  static async makeInvoice(req, res): Promise<object> {
    let isNotValid = validate(req.body, validator.makeInvoice());
    if (isNotValid) return errRes(res, isNotValid);

    let invoice: any;

    try {
      invoice = await Invoice.create({
        ...req.body,
        Host_paid_status: false,
        has_reviewed: false,
        paid_status: false,
        user_refund_status: false,
      });
      await invoice.save();
    } catch (error) {
     return errRes(res, error);
    }
   return okRes(res, `Invoice successfully created`);
  }

  static async acceptTenant(req, res): Promise<object> {
    let user = req.user;
    let invoice: any;

    try {
      invoice = await Invoice.findOne({
        where: { landLord_id: user.id },
      });
      if (!invoice) return errRes(res, `Only the landlord can accept requests`);

      invoice.paid_status = true

     await invoice.save()

    } catch (error) {
     return errRes(res, error);
    }
   return okRes(res, `Tenant accepted`);
  }

  static async sendNotification(req, res): Promise<object> {
    let user = req.user;
    let isNotValid = validate(req.body, validator.notify())
    let notification:any;
    try {
     notification = await Notification.create({
       ...req.body
     })
     await notification.save()

    } catch (error) {
     return errRes(res, error);
    }
   return okRes(res, `Notification sent`);
  }
}
