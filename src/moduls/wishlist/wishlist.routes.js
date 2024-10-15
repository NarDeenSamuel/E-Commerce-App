import { Router } from "express";
import { addToWishlist, getUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validateData } from "../../middleware/validate.js";
import { addWishlistVal, deleteWishlistVal } from "./wishlist.validation.js";




const wishlistRouter = Router()
wishlistRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user'),validateData(addWishlistVal),addToWishlist)
    .delete(protectedRoutes,allowedTo('user'),validateData(deleteWishlistVal),removeFromWishlist)
    .get(protectedRoutes,allowedTo('user'),getUserWishlist)

export default wishlistRouter