import joi from "joi"

const createCashOrdertVal =joi.object({
    id:joi.string().hex().length(24).required(),
    shippingAddress:joi.object({
        street:joi.string().required(),
        city:joi.string().required(),
        phone:joi.string().pattern(/^(01)[0-2,5]{1}[0-9]{8}$/).required()
    }),
    paymentType:joi.string().optional()
})


    const getOneOrderVal =joi.object({
        id:joi.string().hex().length(24).required(),
    })

    const createCheckOutSessionVal =joi.object({
        id:joi.string().hex().length(24).required(),
        shippingAddress:joi.object({
            street:joi.string().required(),
            city:joi.string().required(),
            phone:joi.string().pattern(/^(01)[0-2,5]{1}[0-9]{8}$/).required()
        }),
    })


export {
    createCashOrdertVal,getOneOrderVal,createCheckOutSessionVal
}