
import bcrypt from 'bcrypt'
import { User } from '../../dbConnection/models/user.model.js'
import { appError } from '../utils/appError.js'


export const checkEmail = async(req,res,next)=>{
    let isExist = await User.findOne({email:req.body.email})
    if(isExist) return next(new appError("email already exist",409))
    next()
}
