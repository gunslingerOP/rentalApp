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
    recipient_id: {
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
      type: "string",
    },
    phone: {
      presence: must,
      type: "string",
    },
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
    district_id: {
      type: "number",
      presence: must,
    },
    address: {
      presence: must,
      type: "string",
    },
    images: {
      presence: must,
      type: "array"
    },
    User_id: {
      presence: must,
      type: "number",
    },
    price: {
      presence: must,
      type: "number",
    },
    bedrooms: {
      presence: must,
      type: "number",
    },
    bathrroms: {
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
    property_id: {
      type: "number",
      presence: must,
    },
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
    propertyID: {
      type: "number",
      presence: must,
    },
    image: {
      presence: must,
      type: "string",
    }
  });

  static addReviewImage = (must = true) => ({
    review_id: {
      type: "number",
      presence: must,
    },
    image: {
      presence: must,
      type: "string",
    }
  });
  static makeInvoice = (must = true) => ({
    landlordId: {
      type: "number",
      presence: must,
    },
    propertyId: {
      presence: must,
      type: "number",
    }
  });
}
