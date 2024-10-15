import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validateData } from "../../middleware/validate.js";
import { addToCart, updateQuantity,removeItemFromCart, getCartItems, clearUserCart, applayCoupon } from "./cart.controller.js";
import { addCartVal, applayCouponVal, removeItemFromCartVal, updateQuantityVal } from "./cart.validation.js";





const CartRouter = Router()
CartRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user'),validateData(addCartVal),addToCart)
    .get(protectedRoutes,allowedTo('user'),getCartItems)
    .delete(protectedRoutes,allowedTo('user'),clearUserCart)

    CartRouter
    .route('/:id')
    .put(protectedRoutes,allowedTo('user'),validateData(updateQuantityVal),updateQuantity)
    .delete(protectedRoutes,allowedTo('user'),validateData(removeItemFromCartVal),removeItemFromCart)
    
CartRouter.post('/applyCoupon',protectedRoutes,allowedTo('user'),validateData(applayCouponVal),applayCoupon)

export default CartRouter