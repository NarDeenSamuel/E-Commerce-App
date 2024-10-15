import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../dbConnection/models/user.model.js"






const addToAddresses = catchError(async (req, res, next) => {
    let address = await User.findByIdAndUpdate(req.user._id,{$addToSet:{addresses:req.body}},{new:true})
    address || next(new appError("user not found",404))
    !address || res.json({ message: 'successs', address:address.addresses })
})

const removeFromAddresses = catchError(async (req, res, next) => {
    let address = await User.findByIdAndUpdate(req.user._id,{$pull : {addresses:{_id:req.params.id}}},{new:true})
    address || next(new appError("user not found",404))
    !address || res.json({ message: 'successs', address:address.addresses })
})
const getUserAddresses = catchError(async (req, res, next) => {
    let address = await User.findById(req.user._id)
    address || next(new appError("user not found",404))
    !address || res.json({ message: 'successs', addresses:address.addresses })
})

export {
addToAddresses,removeFromAddresses,getUserAddresses
}