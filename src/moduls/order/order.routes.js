import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validateData } from "../../middleware/validate.js";
import { createCashOrder, createCheckOutSession, getAllOrders, getOneOrder, getUserOrders } from "./order.controller.js";
import { createCashOrdertVal, getOneOrderVal,createCheckOutSessionVal } from "./order.validation.js";







const OrderRouter = Router({mergeParams:true})

OrderRouter
    .route('/')
    .get(protectedRoutes,allowedTo('admin'),getAllOrders)


    OrderRouter
    .route('/:id')
    .post(protectedRoutes,allowedTo('user'),validateData(createCashOrdertVal),createCashOrder)

OrderRouter.get('/users',protectedRoutes,allowedTo('user'),getUserOrders)
OrderRouter.get('/getOneOrder/:id',protectedRoutes,allowedTo('admin'),validateData(getOneOrderVal),getOneOrder)
OrderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user','admin'),validateData(createCheckOutSessionVal),createCheckOutSession)

export default OrderRouter