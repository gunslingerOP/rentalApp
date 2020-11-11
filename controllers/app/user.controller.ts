import * as validate from "validate.js";
import validator from "../../helpers/validate.helper";
import { User } from "../../src/entity/User";
import PhoneFormat from "../../helpers/phone.helper";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
var cron = require('node-cron');

import {
  okRes,
  errRes,
  getOTP,
  hashMyPassword,
  comparePassword,
  sendSMS,
  paginate,
} from "../../helpers/tools";
import config from "../../config/index";
import { Property } from "../../src/entity/property";
import { Invoice } from "../../src/entity/invoice";
import { Review } from "../../src/entity/review";
import { PropertyImage } from "../../src/entity/propertyImages";
import { ReviewImage } from "../../src/entity/reviewImage";
import { Notification } from "../../src/entity/notifications";
import { District } from "../../src/entity/district";
import { City } from "../../src/entity/city";
import { Province } from "../../src/entity/province";
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
      if (!validPassword) {
        return errRes(res, `password is incorrect`);
      }
      token = jwt.sign({ id: user.id }, config.jwtSecret);
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, { data: [token] });
  }

  static async sendReset(req, res): Promise<object> {
    let notValid = validate(req.body, validator.sendReset());
    if (notValid) return errRes(res, notValid);

    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not valid`);
    let phone = phoneObj.globalP;

    let user = req.user;

    if (!user.verified) return errRes(res, `Please verify your account first`)
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
      await user.save();
      return errRes(res, `You entered a wrong OTP, please get a new one sent`);
    }

    if (user.resetotp == req.body.otp) {
      user.password = await hashMyPassword(req.body.newPassword);
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
    let property: any;

    property = await Property.findOne({
      where: { id: req.body.propertyID },
    });
    if (!property) return errRes(res, `no such property found`);
    let newImage: any;
    try {
      newImage = await PropertyImage.create({
        ...req.body,
        property,
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

    let review: any;

    review = await Review.findOne({
      where: { id: req.body.reviewId },
    });
    if (!review) return errRes(res, `no such property found`);
    let newImage: any;
    try {
      newImage = await ReviewImage.create({
        ...req.body,
        review,
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
    let province: any;
    let city: any;
    let district: any;

    try {
      district = await District.findOne({
        where: { id: req.body.districtId },
      });
      if (!district) return errRes(res, `no such district found`);
      district.active = true;
      await district.save();

      city = await City.findOne({
        where: { id: district.cityId },
      });
      if (!city) return errRes(res, `no such city found`);
      city.active = true;
      await city.save();

      province = await Province.findOne({
        where: { id: city.provinceID },
      });
      if (!province) return errRes(res, `no such province found`);
      province.active = true;
      await province.save();
    } catch (error) {
      return errRes(res, "its me");
    }

    let user = req.user;
    let property: any;
    if (!user.isOwner) return errRes(res, `please activate your host status`);

    try {
      property = await Property.create({
        ...req.body,
        ownerid: user.id,
        booked: false,
        district,
        city,
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

    let property: any;

    property = await Property.findOne({
      where: { id: req.body.propertyId },
    });
    if (!property) return errRes(res, `no such property found`);

    let review: any;
    invoiceStatus = await Invoice.findOne({
      where: { userId: user.id, hasReviewed: false, paidStatus: true, hostPaidStatus:true },
    });
    if (user.id == invoiceStatus.landlordId)
      return errRes(res, `You can't put reviews of your own properties!`);
    if (!invoiceStatus)
      return errRes(
        res,
        `You must use the place and pay the bill to review it`
      );
    invoiceStatus.hasReviewed = true;
    invoiceStatus.save();
    try {
      review = await Review.create({
        ...req.body,
        tenantId: user.id,
        property,
      });
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, `Review successfully submitted`);
  }

  static async makeInvoiceUser(req, res): Promise<object> {
    let isNotValid = validate(req.body, validator.makeInvoiceUser());
    if (isNotValid) return errRes(res, isNotValid);
    let user = req.user;
    let invoice: any;

    try {
      invoice = await Invoice.create({
        ...req.body,
        user,
        userId: user.id,
        hostPaidStatus: false,
        hasReviewed: false,
        paidStatus: false,
        userRefundStatus: false,
      });
      await invoice.save();
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, `Invoice successfully created`);
  }

  static async getInvoiceLandlord(req, res): Promise<object> {
    let isNotValid = validate(req.body, validator.getInvoiceLandlord());
    if (isNotValid) return errRes(res, isNotValid);
    let user = req.user;
    if (!user.isOwner)
      return errRes(res, `Please activate your host status first!`);
    let invoice: any;

    let {p ,s } = req.query
    let {take, skip} = paginate(p ,s)
    try {
      invoice = await Invoice.findAndCount({
        where: { landlordId: user.id },
        take,
        skip
      });
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, invoice);
  }

  static async acceptTenant(req, res): Promise<object> {
    let user = req.user;
    let invoice: any;
    let property: any;

    try {
      invoice = await Invoice.findOne({
        where: { landlordId: user.id },
      });
      property = await Property.find({
        where: { id: invoice.propertyId },
      });
      property.booked = true
      await property.save()
      if (!invoice) return errRes(res, `Only the landlord can accept requests`);

      invoice.paidStatus = true;

      await invoice.save();
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, `Tenant accepted`);
  }

  static async sendNotification(req, res): Promise<object> {
    let user = req.user;
    let isNotValid = validate(req.body, validator.notify());
    if(isNotValid) return errRes(res, isNotValid)
    let notification: any;
    try {
      notification = await Notification.create({
        ...req.body,
        user
      });
      await notification.save();
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, `Notification sent`);
  }

  
}
