
import jwt from 'jsonwebtoken'
import { catchError } from "../../middleware/catchError.js";
import { User } from '../../../dbConnection/models/user.model.js';
import { appError } from '../../utils/appError.js';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();


const signUp = async (req, res) => {
    let user = new User(req.body);
    await user.save()
    let token = jwt.sign({ id: user._id, role: user.role,  userName: user.userName,userEmail:user.email}, process.env.SECRET_KEY)
    res.status(200).json({ message: "success",token })
}

const signIn = catchError(async (req, res,next) => {

    let user = await User.findOne({email: req.body.email})
    
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ id: user._id, role: user.role,  userName: user.userName,userEmail:user.email}, process.env.SECRET_KEY)
        return   res.status(200).json({ message: "welcome",token})
    }
    next(new appError(" Invalid email or  password ",401))
})


const changeUsePassword = catchError(async(req,res,next)=>{

    let user = await User.findOne({email: req.body.email})
    
    if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
        await User.findOneAndUpdate({email: req.body.email},{password:req.body.newPassword,passwordChangedAt: Date.now() })
        let token = jwt.sign({ id: user._id, role: user.role,  userName: user.userName,userEmail:user.email}, process.env.SECRET_KEY)
        return   res.status(200).json({ message: "welcome",token})
    }
    next(new appError(" Invalid email or  password ",401))

})

const protectedRoutes = catchError(async(req,res,next)=>{
    let {token} = req.headers
    let userPayload=null
    if(!token) return next(new appError('token not provided',401))
        jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
            if(err) return next(new appError('token not provided',401))
                userPayload=payload
        })
        let user = await User.findById(userPayload.id)
        if(!user)return next(new appError('user not found',401))
            if(user.passwordChangedAt){
                let time = parseInt(user.passwordChangedAt.getTime()/1000)
                if(time> userPayload.iat) return next(new appError('invalid token .... login again',401))
                   
            }
       req.user=user
        next()
})
const allowedTo = (...roles)=>{
    return catchError(async(req,res,next)=>{
       
        if(roles.includes(req.user.role)) return next()
            return next(new appError('you not authroized to access this end point',401))
    })
}


export{
    signIn,signUp,changeUsePassword,protectedRoutes,allowedTo
}