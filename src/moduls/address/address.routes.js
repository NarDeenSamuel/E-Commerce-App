import { Router } from "express";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validateData } from "../../middleware/validate.js";
import { addToAddresses, getUserAddresses, removeFromAddresses } from "./address.controller.js";
import { addAddressVal, deleteAddressVal } from "./address.validation.js";




const addressRouter = Router()
addressRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user'),validateData(addAddressVal),addToAddresses)
    .get(protectedRoutes,allowedTo('user'),getUserAddresses)
    addressRouter
    .route('/:id')
    .delete(protectedRoutes,allowedTo('user'),validateData(deleteAddressVal),removeFromAddresses)

export default addressRouter