import  config from "../../config/index";
import * as jwt from "jsonwebtoken";
import validate = require("validate.js");
import { errRes, okRes } from "../../helpers/tools";
import Validator from "../../helpers/validate.helper";
import { Admin } from "../../src/entity/admins";
import { Province } from "../../src/entity/province";
import { Request, Response } from "express";
import { request } from "http";
import { City } from "../../src/entity/city";
import { District } from "../../src/entity/district";
import { findSourceMap } from "module";



export default class AdminController{


static async login(req:Request, res:Response){
let notValid = validate(req.body, Validator.adminLogin())
if(notValid) return errRes(res, notValid)
let token:any;
let admin:any;

    admin = await Admin.findOne({
       where:{email:req.body.email, password:req.body.password}
   })
    if (!admin) return errRes(res, `wrong credentials`)
    token = jwt.sign({id: admin.id}, config.jwtSecret)

return okRes(res, [token])

}

static async addProvince(req,res){
   let isNotvalid = validate(req.body, Validator.addProvince())
if(isNotvalid) return errRes(res, isNotvalid)
let province:any;

try {
    
    province = await Province.create({
        ...req.body
    })
  await  province.save()
} catch (error) {
  return errRes(res,error)  
}

return okRes(res, `Province successfully created`)
}

static async addCity(req,res){
    let isNotvalid = validate(req.body, Validator.addCity())
 if(isNotvalid) return errRes(res, isNotvalid)
 let province:any;
 let city:any;

 try {
     province = await Province.findOne({
         where:{id : req.params.provinceId}
     })
     
 } catch (error) {
     return errRes(res, error)
 }
 
 try {
     
     city = await City.create({
         ...req.body,
         province
     })
   await  city.save()
 } catch (error) {
   return errRes(res,error)  
 }
 
 return okRes(res, `City successfully created`)
 }

 static async addDistrict(req,res){
    let isNotvalid = validate(req.body, Validator.addDistrict())
 if(isNotvalid) return errRes(res, isNotvalid)
 let district:any;
 let city:any

 try {
    city = await City.findOne({
        where:{id : req.params.cityId}
    })
    
} catch (error) {
    return errRes(res, error)
}
 try {
     
     district = await District.create({
         ...req.body,
         city
     })
   await  district.save()
 } catch (error) {
   return errRes(res,error)  
 }
 
 return okRes(res, `district successfully created`)
 }

}