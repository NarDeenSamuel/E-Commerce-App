import { Router } from "express";
import { validateData } from "../../middleware/validate.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addReview,getReviews,getReview,updateReview,deleteReview} from "./review.controller.js";
import { addReviewVal,getReviewVal,updateReviewVal,deleteReviewVal } from "./review.validation.js";



const reviewRouter = Router()
reviewRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user'),validateData(addReviewVal),addReview)
    .get(getReviews)
reviewRouter
    .route('/:id')
    .get(validateData(getReviewVal),getReview)
    .put(protectedRoutes,allowedTo('user'),validateData(updateReviewVal),updateReview)
    .delete(protectedRoutes,allowedTo('user','admin'),validateData(deleteReviewVal),deleteReview)

export default reviewRouter