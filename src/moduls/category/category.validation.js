import joi from "joi"

const addCategoryVal =joi.object({
    name:joi.string().min(3).max(50).required(),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().valid('image/jpeg','image/png','image/jpg','image/gif').required(),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    }).required()
})

const getCategoryVal =joi.object({
    id:joi.string().hex().length(24)
    })

    const updateCategoryVal =joi.object({
        name:joi.string().min(3).max(50),
        image:joi.object({
            fieldname:joi.string().required(),
            originalname:joi.string().required(),
            encoding:joi.string().required(),
            mimetype:joi.string().valid('image/jpeg','image/png','image/jpg','image/gif').required(),
            size:joi.number().max(5242880).required(),
            destination:joi.string().required(),
            filename:joi.string().required(),
            path:joi.string().required(),
        }), 
        id:joi.string().hex().length(24).required(),
    }).or('name','image');

    const deleteCategoryVal =joi.object({
        id:joi.string().hex().length(24).required(),
        })
    
export {
    addCategoryVal,getCategoryVal,updateCategoryVal,deleteCategoryVal
}