import joi from "joi"

const addCouponVal = joi.object({
    code: joi.string().required(),
    expires: joi.date().required(),
    discount: joi.string().required(),
})
const getCouponVal = joi.object({
    id: joi.string().hex().length(24).required(),
})

const updateCouponVal = joi.object({
    code: joi.string(),
    expires: joi.date(),
    discount: joi.string(),
    id: joi.string().hex().length(24).required(),
}).or('code', 'expires', 'discount');

const deleteCouponVal = joi.object({
    id: joi.string().hex().length(24).required(),
})

export {
    addCouponVal, getCouponVal, updateCouponVal, deleteCouponVal
}