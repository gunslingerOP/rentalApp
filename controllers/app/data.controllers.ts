import { ALL } from "dns";
import { errRes, okRes } from "../../helpers/tools";
import { Invoice } from "../../src/entity/invoice";
import { Notification } from "../../src/entity/notifications";
import { Property } from "../../src/entity/property";
import { PropertyImage } from "../../src/entity/propertyImages";
import { Province } from "../../src/entity/province";
import { Review } from "../../src/entity/review";

export default class dataStore {
  static async getNotifications(req, res): Promise<object> {
    let user = req.user;
    let notification: any;
    notification = await Notification.find({
      where: { recipient_id: user.id },
    });
    if (!notification) return errRes(res, `can't find your notifications`);
    return okRes(res, { data: notification });
  }

  static async getInvoices(req, res): Promise<object> {
    let user = req.user;
    let invoice: any;

    try {
      invoice = await Invoice.find({
        where: [{ landLord_id: user.id }, { user_id: user.id }],
      });
      if (!invoice) return errRes(res, `No invoices found`);
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, invoice);
  }

  static async getLocation(req, res):Promise<object>{
    let provinces:any;

    provinces = await Province.find({
    
        join:{
            alias:'province',
            leftJoinAndSelect:{
                cities: 'province.cities',
                districts: 'cities.districts'
            }
        }
    
    })
    if(!provinces) return errRes(res, `no provinces found`)

    okRes(res, provinces)
  }
  static async getCityProperties(req, res):Promise<object>{
    let cityID = req.query.cityId
let properties:any
    properties = await Property.find({
        where:{city_id:cityID}
    })
    if(!properties) return errRes(res, `no properties found`)

    okRes(res, properties)
  }

  static async getDistrictProperties(req, res):Promise<object>{
    let districtId = req.query.districtId
let properties:any
    properties = await Property.find({
        where:{district_id:districtId}
    })
    if(!properties) return errRes(res, `no properties found`)

    okRes(res, properties)
  }

  static async getPropertyImages(req, res):Promise<object>{
    let property = req.query.propertyId
let images:any
    images = await PropertyImage.find({
        where:{propertyID:property}
    })
    if(!images) return errRes(res, `no properties found`)

    okRes(res, images)
  }
 

  static async getPropertyReviews(req, res):Promise<object>{
    let property = req.query.propertyId
let reviews:any
    reviews = await Review.find({
        where:{propertyID:property}
    })
    if(!reviews) return errRes(res, `no properties found`)

    okRes(res, reviews)
  }
}
