import joi from "joi"

const addAddressVal =joi.object({
    street:joi.string().required(),
    phone:joi.string().pattern(/^(01)[0-2,5]{1}[0-9]{8}$/).required(),
    city:joi.string().required()
})
    const deleteAddressVal =joi.object({
        id:joi.string().hex().length(24).required(),
        })

    
export {
    addAddressVal,deleteAddressVal
}