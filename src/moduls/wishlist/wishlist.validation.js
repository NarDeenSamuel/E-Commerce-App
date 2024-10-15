import joi from "joi"

const addWishlistVal =joi.object({
    product:joi.string().hex().length(24).required(),
  
})
    const deleteWishlistVal =joi.object({
        product:joi.string().hex().length(24).required(),
        })

    
export {
    addWishlistVal,deleteWishlistVal
}