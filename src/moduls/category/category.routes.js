import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validateData } from "../../middleware/validate.js";
import { addCategoryVal, deleteCategoryVal, getCategoryVal, updateCategoryVal } from "./category.validation.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const categoryRouter = Router()


categoryRouter.use('/:category/subcategories',subCategoryRouter)
categoryRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user','admin'),uploadSingleFile('image','categories'),validateData(addCategoryVal, { imageField: 'image' }),addCategory)
    .get(getCategories)
categoryRouter
    .route('/:id')
    .get(validateData(getCategoryVal),getCategory)
    .put(protectedRoutes,allowedTo('admin'),uploadSingleFile('image','categories'),validateData(updateCategoryVal, { imageField: 'image' }),updateCategory)
    .delete(protectedRoutes,allowedTo('admin'),validateData(deleteCategoryVal),deleteCategory)

export default categoryRouter