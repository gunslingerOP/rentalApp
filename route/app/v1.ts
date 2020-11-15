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
router.post("/addpropertyimage/:propertyId", userAuth, UserController.addPropertyImage);
router.post("/postreview/:propertyId", userAuth, UserController.postReview);
router.post("/addreviewimage/:reviewId", userAuth, UserController.addReviewImage);
router.post("/makeinvoice", userAuth, UserController.makeInvoiceUser);
router.post("/accepttenant/:invoiceId", userAuth, UserController.acceptTenant); 
router.post("/notify", userAuth, UserController.sendNotification);
router.post("/refund/:invoiceId", userAuth, UserController.cancelBooking)

router.get("/invoice/landlord", userAuth, UserController.getInvoiceLandlord);
router.get("/notifications", userAuth, dataStore.getNotifications);
router.get("/invoices/user", userAuth, dataStore.getInvoices);
router.get("/location", dataStore.getLocation);
router.get("/city/properties/:cityId", dataStore.getCityProperties);
router.get("/districtproperties/:districtId", dataStore.getDistrictProperties);
router.get("/property/images/:propertyId", dataStore.getPropertyImages);
router.get("/reviews/:propertyId", dataStore.getPropertyReviews);

// ------------------------------------ADMIN STUFF-------------------------------------------------

router.post("/admin/login", AdminController.login);
router.post("/addprovince", adminAuth, AdminController.addProvince);
router.post("/addcity/:provinceId", adminAuth, AdminController.addCity);
router.post("/adddistrict/:cityId", adminAuth, AdminController.addDistrict);
router.get("pendingInvoices", adminAuth, AdminController.getPendingInvoices)
router.get("paidInvoices", adminAuth, AdminController.getPaidInvoices)


export default router;
