import { Router } from "express";
import { addSubCategory,getSubCategories,getSubCategory,updateSubCategory,deleteSubCategory
} from "./subcategory.controller.js";
import { validateData } from "../../middleware/validate.js";
import { addSubcategoryVal, deleteSubcategoryVal, getSubcategoryVal, updateSubcategoryVal } from "./subcategory.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const subCategoryRouter = Router({mergeParams:true})
subCategoryRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user','admin'),validateData(addSubcategoryVal),addSubCategory)
    .get(getSubCategories)
subCategoryRouter
    .route('/:id')
    .get(validateData(getSubcategoryVal),getSubCategory)
    .put(protectedRoutes,allowedTo('admin'),validateData(updateSubcategoryVal),updateSubCategory)
    .delete(protectedRoutes,allowedTo('admin'),validateData(deleteSubcategoryVal),deleteSubCategory)

export default subCategoryRouter