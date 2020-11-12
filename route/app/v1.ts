import * as express from "express";
import AdminController from "../../controllers/app/admin.controller";
import dataStore from "../../controllers/app/data.controllers";
import UserController from "../../controllers/app/user.controller";
import adminAuth from "../../middleware/adminAuth";
import apiLimiter from "../../middleware/expressLimiter";
import userAuth from "../../middleware/userAuth";
const router = express.Router();

router.post("/register", apiLimiter, UserController.register);
router.post("/verify", UserController.verify);
router.post("/login", UserController.login);
router.post("/sendreset", apiLimiter, userAuth, UserController.sendReset);
router.post("/resetPassword", userAuth, UserController.resetPassword);
router.post("/becomehost", userAuth, UserController.becomeHost);
router.post("/postproperty", apiLimiter, userAuth, UserController.postProperty);
router.post("/addpropertyimage", userAuth, UserController.addPropertyImage);
router.post("/postreview/:propertyId", userAuth, UserController.postReview);
router.post("/addreviewimage", userAuth, UserController.addReviewImage);
router.post("/makeinvoice", userAuth, UserController.makeInvoiceUser);
router.post("/accepttenant/:invoiceId", userAuth, UserController.acceptTenant); 
router.post("/notify", userAuth, UserController.sendNotification);

router.get("/invoicelandlord", userAuth, UserController.getInvoiceLandlord);
router.get("/notifications", userAuth, dataStore.getNotifications);
router.get("/invoicesuser", userAuth, dataStore.getInvoices);
router.get("/location", dataStore.getLocation);
router.get("/city/properties/:cityId", dataStore.getCityProperties);
router.get("/districtproperties/:districtId", dataStore.getDistrictProperties);
router.get("/property/images/:propertyId", dataStore.getPropertyImages);
router.get("/property/reviews/:reviewId", dataStore.getPropertyReviews);

// ------------------------------------ADMIN STUFF-------------------------------------------------

router.post("/adminlogin", AdminController.login);
router.post("/addprovince", adminAuth, AdminController.addProvince);
router.post("/addcity", adminAuth, AdminController.addCity);
router.post("/adddistrict", adminAuth, AdminController.addDistrict);
// TODO: get orders 

export default router;
