
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User} from "../../../dbConnection/models/user.model.js"
import { deleteOne,  getOne } from "../handlers/handler.js"
import { ApiFeature } from "../../utils/apiFeatures.js"


const addUser = catchError(async (req, res, next) => {
   
    let user = new User(req.body)
    await user.save()
    res.json({ message: 'success',user})
})

const getUsers = catchError(async(req,res,next)=>{
    let apiFeature = new ApiFeature(User.find(), req.query).pagination().search().filter().sort().fields();
    let users = await apiFeature.mongooseQuery;
    res.json({ message: "success", page: apiFeature.pageNumber, users });

})

const getUser = getOne(User)


const updateUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    user || next(new appError("user not found",404))
    !user || res.json({ message: 'successs', user })
})


const deleteUser = deleteOne(User)


export {
addUser,getUsers,getUser,updateUser,deleteUser
}