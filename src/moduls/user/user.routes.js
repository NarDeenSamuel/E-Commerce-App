import { Router } from "express";
import { addUser,getUsers,getUser,updateUser,deleteUser } from "./user.controller.js";
import { validateData } from "../../middleware/validate.js";
import { addUserVal, deleteUserVal, getUserVal, updateUserVal } from "./user.validation.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import OrderRouter from "../order/order.routes.js";




const userRouter = Router()
userRouter.use('/:user/orders',OrderRouter)
userRouter
    .route('/')
    .post(protectedRoutes,allowedTo('admin'),validateData(addUserVal),checkEmail,addUser)
    .get(getUsers)
userRouter
    .route('/:id')
    .get(validateData(getUserVal),getUser)
    .put(protectedRoutes,allowedTo('admin'),validateData(updateUserVal),updateUser)
    .delete(protectedRoutes,allowedTo('admin'),validateData(deleteUserVal),deleteUser)

export default userRouter