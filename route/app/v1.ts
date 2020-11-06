import * as express from "express";
import UserController from "../../controllers/app/user.controller";
const router = express.Router();


router.post("/register", UserController.register)


export default router;