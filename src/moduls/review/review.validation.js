import joi from "joi"

const addReviewVal =joi.object({
    comment:joi.string().max(150).required(),
    product:joi.string().hex().length(24).required(),
    rate:joi.number().min(0).max(5).required()
})
const getReviewVal =joi.object({
    id:joi.string().hex().length(24).required(),
    })

    const updateReviewVal =joi.object({
        comment:joi.string().max(150).required(),
        id:joi.string().hex().length(24).required(),
        rate:joi.number().min(0).max(5).required()
        
    }).or('comment','rate');

    const deleteReviewVal =joi.object({
        id:joi.string().hex().length(24).required(),
        })
    
export {
    addReviewVal,getReviewVal,updateReviewVal,deleteReviewVal
}