import { Router } from "express";
import { validateData } from "../../middleware/validate.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCoupon,getCoupons,getCoupon,updateCoupon,deleteCoupon } from "./coupon.controller.js";
import { addCouponVal, deleteCouponVal, getCouponVal, updateCouponVal } from "./coupon.validation.js";



const CouponRouter = Router()
CouponRouter.use(protectedRoutes,allowedTo('admin'))
CouponRouter
    .route('/')
    .post(validateData(addCouponVal),addCoupon)
    .get(getCoupons)
CouponRouter
    .route('/:id')
    .get(validateData(getCouponVal),getCoupon)
    .put(validateData(updateCouponVal),updateCoupon)
    .delete(validateData(deleteCouponVal),deleteCoupon)

export default CouponRouter