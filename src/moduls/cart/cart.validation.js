import joi from "joi"

const addCartVal =joi.object({
    product:joi.string().hex().length(24).required(),
    quantity:joi.number().required()
})

const updateQuantityVal = joi.object({
    id:joi.string().hex().length(24).required(),
    quantity:joi.number().required()
})

    const removeItemFromCartVal =joi.object({
        id:joi.string().hex().length(24).required(),
    })

    const applayCouponVal =joi.object({
        code:joi.string().required(),
    })

    


export {
    addCartVal,removeItemFromCartVal,updateQuantityVal,applayCouponVal
}