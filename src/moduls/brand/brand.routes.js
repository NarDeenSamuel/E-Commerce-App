import { Router } from "express";
import { addBrand,getBrand,getBrands,updateBrand,deleteBrand } from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validateData } from "../../middleware/validate.js";
import { addBrandVal, deleteBrandVal, getBrandVal, updateBrandVal } from "./brand.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const brandRouter = Router()
brandRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user','admin'),uploadSingleFile('logo','brands'),validateData(addBrandVal, { logoField: 'logo' }),addBrand)
    .get(getBrands)
brandRouter
    .route('/:id')
    .get(validateData(getBrandVal),getBrand)
    .put(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brands'),validateData(updateBrandVal, { logoField: 'logo' }),updateBrand)
    .delete(protectedRoutes,allowedTo('admin'),validateData(deleteBrandVal),deleteBrand)

export default brandRouter