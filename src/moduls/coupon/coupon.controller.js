import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne,  getOne } from "../handlers/handler.js"
import { ApiFeature } from "../../utils/apiFeatures.js"
import { Coupon } from "../../../dbConnection/models/coupon.model.js"


const addCoupon = catchError(async (req, res, next) => {
    let isExist = await Coupon.findOne({code:req.body.code})
    if(isExist)  return next(new appError("Coupon is already exist",404))
    let coupon = new Coupon(req.body)
    await coupon.save()
    res.json({ message: 'success',coupon})
})

const getCoupons = catchError(async(req,res,next)=>{
    let apiFeature = new ApiFeature(Coupon.find(), req.query).pagination().search().filter().sort().fields();
    let coupons = await apiFeature.mongooseQuery;
    res.json({ message: "success", page: apiFeature.pageNumber, coupons });
})

const getCoupon = getOne(Coupon)


const updateCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon || next(new appError("Coupon not found",404))
    !coupon || res.json({ message: 'successs', coupon })
})


const deleteCoupon = deleteOne(Coupon)


export {
addCoupon,getCoupons,getCoupon,updateCoupon,deleteCoupon
}