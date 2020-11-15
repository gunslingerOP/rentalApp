import { stringify } from "querystring";

export default class Validator {
  static register = (must = true) => ({
    firstName: {
      presence: must,
      type: "string",
    },
    middleName: {
      presence: must,
      type: "string",
    },
    lastName: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      type: "string",
    },
    phone: {
      presence: must,
      type: "string",
      length: { maximum: 15, minimum: 10 },
    },
    password: {
      presence: must,
      type: "string",
      length: { maximum: 15, minimum: 4 },
    },
  });

  static verify = (must = true) => ({
    OTP: {
      presence: must,
      type: "number",
    },
  });
 

  static notify = (must = true) => ({
    recipientId: {
      presence: must,
      type: "number",
    },
    msg:{
      presence: must,
      type: "string",
    }
  });
  static login = (must = true) => ({
    email: {
      presence:must,
      type: "string",
    },
    password:{
      presence:must,
      type:"string"
    }
  });

  static adminLogin = (must = true) => ({
    email: {
      type: "string",
      presence:must
    },
    password: {
      presence: must,
      type: "string",
    },
  });

  static addProvince = (must = true) => ({
    name: {
      type: "string",
      presence:must
    }
  });
  static addCity = (must = true) => ({
    name: {
      type: "string",
      presence:must
    }
  });
  static addDistrict = (must = true) => ({
    name: {
      type: "string",
      presence:must
    }

  });
  static sendReset = (must = true) => ({
    phone: {
      type: "string",
      presence: must,
    },
  });

  static resetPassword = (must = true) => ({
    newPassword: {
      type: "string",
      presence: must,
    },
    otp: {
      presence: must,
      type: "number",
    },
  });

  static postProperty = (must = true) => ({
    districtId: {
      type: "number",
      presence: must,
    },
    cityId: {
      type: "number",
      presence: must,
    },
    address: {
      presence: must,
      type: "string",
    },
    description: {
      presence: must,
      type: "string"
    },
    title: {
      presence: must,
      type: "string"
    },
    userId: {
      presence: must,
      type: "number",
    },
    price: {
      presence: must,
      type: "string",
    },
    bedrooms: {
      presence: must,
      type: "number",
    },
    bathrooms: {
      presence: must,
      type: "number",
    },
    size: {
      presence: must,
      type: "string",
    },
    longitude: {
      presence: must,
      type: "string",
    },
    latitude: {
      presence: must,
      type: "string",
    },
  });

  static postReview = (must = true) => ({
   
    stars: {
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        lessThanOrEqualTo: 5,
      },
    },
    title: {
      presence: must,
      type: "string",
    },
    body: {
      presence: must,
      type: "string",
    }
  });
  static addPropertyImage = (must = true) => ({
 
    image: {
      presence: must,
      type: "array",
    }
  });

  static addReviewImage = (must = true) => ({
    image: {
      presence: must,
      type: "array",
    }
  });
  static makeInvoiceUser = (must = true) => ({
    landlordId: {
      type: "number",
      presence: must,
    },
    propertyId: {
      presence: must,
      type: "number",
    },
    price: {
      presence: must,
      type: "string",
    },
    startHour:{
      presence:must,
      type:"number"
    },
    startDay:{
      presence:must,
      type:"number"
    },
    startMonth:{
      presence:must,
      type:"number"
    },
    startYear:{
      presence:must,
      type:"number"
    },
    endDay:{
      presence:must,
      type:"number"
    },
    endMonth:{
      presence:must,
      type:"number"
    }
  });

  static getInvoiceLandlord = (must = true) => ({
    landlordId: {
      type: "number",
      presence: must,
    }
  });
}
