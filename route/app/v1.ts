import * as express from "express";
import dataStore from "../../controllers/app/data.controllers";
import UserController from "../../controllers/app/user.controller";
import apiLimiter from "../../middleware/expressLimiter";
import userAuth from "../../middleware/userAuth";
const router = express.Router();


router.post("/register", apiLimiter, UserController.register)
router.post("/verify", UserController.verify)
router.post("/login",userAuth, UserController.login)
router.post("/sendreset",apiLimiter,userAuth, UserController.sendReset)
router.post("/resetPassword",userAuth, UserController.resetPassword)
router.post("/becomehost",userAuth, UserController.becomeHost)
router.post("/postproperty",userAuth, UserController.postProperty)
router.post("/addpropertyimage",userAuth, UserController.addPropertyImage)
router.post("/addreviewimage",userAuth, UserController.addReviewImage)
router.post("/makeinvoice",userAuth, UserController.makeInvoice)
router.post("/accepttenant",userAuth, UserController.acceptTenant)
router.post("/notify",userAuth, UserController.sendNotification)

router.post("/getnotifications", userAuth, dataStore.getNotifications)

export default router;