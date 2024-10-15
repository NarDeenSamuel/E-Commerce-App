import joi from "joi"

const addSubcategoryVal =joi.object({
    name:joi.string().min(3).max(50).required(),
    category:joi.string().hex().length(24).required(),
})
const getSubcategoryVal =joi.object({
    id:joi.string().hex().length(24).required(),
    })

    const updateSubcategoryVal =joi.object({
        name:joi.string().min(3).max(50).required(),
        id:joi.string().hex().length(24).required(),
    });

    const deleteSubcategoryVal =joi.object({
        id:joi.string().hex().length(24).required(),
        })
    
export {
    addSubcategoryVal,getSubcategoryVal,updateSubcategoryVal,deleteSubcategoryVal
}