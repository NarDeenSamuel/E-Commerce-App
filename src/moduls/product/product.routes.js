import { Router } from "express";
import { addProduct,getProduct,getProducts,updateProduct,deleteProduct } from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
import { validateData } from "../../middleware/validate.js";
import { addProductVal, deleteProductVal, getProductVal, updateProductVal } from "./product.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const productRouter = Router()
productRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user','admin'),uploadMixOfFiles([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}],'products'),validateData(addProductVal,{ productImagesField: true }),addProduct)
    .get(getProducts)
productRouter
    .route('/:id')
    .get(validateData(getProductVal),getProduct)
    .put(protectedRoutes,allowedTo('admin'),uploadMixOfFiles([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}],'products'),validateData(updateProductVal,{ productImagesField: true }),updateProduct)
    .delete(protectedRoutes,allowedTo('admin'),validateData(deleteProductVal),deleteProduct)

export default productRouter
validateData