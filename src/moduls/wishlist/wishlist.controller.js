import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../dbConnection/models/user.model.js"






const addToWishlist = catchError(async (req, res, next) => {
    let wishlist = await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true})
    wishlist || next(new appError("user not found",404))
    !wishlist || res.json({ message: 'successs', wishlist:wishlist.wishlist })
})

const removeFromWishlist = catchError(async (req, res, next) => {
    let wishlist = await User.findByIdAndUpdate(req.user._id,{$pull : {wishlist:req.body.product}},{new:true})
    wishlist || next(new appError("user not found",404))
    !wishlist || res.json({ message: 'successs', wishlist:wishlist.wishlist })
})
const getUserWishlist = catchError(async (req, res, next) => {
    let wishlist = await User.findById(req.user._id).populate('wishlist')
    wishlist || next(new appError("user not found",404))
    !wishlist || res.json({ message: 'successs', wishlist:wishlist.wishlist })
})

export {
addToWishlist,removeFromWishlist,getUserWishlist
}