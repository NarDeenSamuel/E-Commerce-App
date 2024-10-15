import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne,  getOne } from "../handlers/handler.js"
import { ApiFeature } from "../../utils/apiFeatures.js"
import { Review } from "../../../dbConnection/models/review.model.js"



const addReview = catchError(async (req, res, next) => {

    req.body.user = req.user._id
    let isExist = await Review.findOne({user:req.user._id,product:req.body.product})
    if(isExist) return next(new appError("you created a review before",409))
    let review = new Review(req.body)
    await review.save()
    res.json({ message: 'success',review})
})

const getReviews = catchError(async(req,res,next)=>{
    let apiFeature = new ApiFeature(Review.find(), req.query).pagination().search().filter().sort().fields();
    let reviews = await apiFeature.mongooseQuery;
    res.json({ message: "success", page: apiFeature.pageNumber, reviews });

})

const getReview = getOne(Review)


const updateReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    review || next(new appError("Review not found",404))
    !review || res.json({ message: 'successs', review })
})


const deleteReview = deleteOne(Review)


export {
addReview,getReviews,getReview,updateReview,deleteReview
}