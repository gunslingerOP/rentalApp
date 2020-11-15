import { errRes, okRes } from "../../helpers/tools";
import { Invoice } from "../../src/entity/invoice";
import { Notification } from "../../src/entity/notifications";
import { Property } from "../../src/entity/property";
import { PropertyImage } from "../../src/entity/propertyImages";
import { Province } from "../../src/entity/province";
import { Review } from "../../src/entity/review";
import { paginate } from "../../helpers/tools";
export default class dataStore {
  static async getNotifications(req, res): Promise<object> {
    let user = req.user;
    let notification: any;
    let { p, s } = req.query;

    let { skip, take } = paginate(p, s);

    notification = await Notification.findAndCount({
      where: { recipientId: user.id },
      skip,
      take,
      order: { created: "DESC" },
    });
    if (!notification) return errRes(res, `can't find your notifications`);
    return okRes(res, { data: notification });
  }

  static async getInvoices(req, res): Promise<object> {
    let user = req.user;
    let invoice: any;

    let { p, s } = req.query;
    let { take, skip } = paginate(p, s);

    try {
      invoice = await Invoice.findAndCount({
        where:  { user: user.id },
        take,
        skip,
      });
      if (!invoice) return errRes(res, `No invoices found`);
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, invoice);
  }

  static async getLocation(req, res): Promise<object> {
    let provinces: any;

    provinces = await Province.find({
      join: {
        alias: "province",
        leftJoinAndSelect: {
          cities: "province.cities",
          districts: "cities.districts",
        },
      },
    });
    if (!provinces) return errRes(res, `no provinces found`);

    okRes(res, provinces);
  }
  static async getCityProperties(req, res): Promise<object> {
    let cityID = req.params.cityId;
    let properties: any;

    let { p, s } = req.query;
    let { take, skip } = paginate(p, s);
    properties = await Property.findAndCount({
      where: { city: cityID }, //FIXME: changed this to directly entity
      take,
      skip
    });
    if (!properties) return errRes(res, `no properties found`);

    okRes(res, properties);
  }

  static async getDistrictProperties(req, res): Promise<object> {
    let districtId = req.params.districtId;
    let properties: any;

    let {p ,s } = req.query
    let {take, skip} = paginate(p ,s)

    properties = await Property.findAndCount({
      where: { district: districtId },
      take,
      skip
    });
    if (!properties) return errRes(res, `no properties found`);

    okRes(res, properties);
  }

  static async getPropertyImages(req, res): Promise<object> {
    let property = req.params.propertyId;
    let images: any;
    images = await PropertyImage.find({
      where: { property: property },
    });
    if (!images) return errRes(res, `no properties found`);

    okRes(res, images);
  }

  static async getPropertyReviews(req, res): Promise<object> {
    let property = req.params.propertyId;
    let reviews: any;
    reviews = await Review.find({
      where: { property: property },
      join:{
        alias:"review",
        leftJoinAndSelect:{
          images:"review.images"
        }
      }
    });
    if (!reviews) return errRes(res, `no properties found`);

    okRes(res, reviews);
  }
}
