import joi from "joi"

const addBrandVal =joi.object({
    name:joi.string().min(3).max(50).required(),
    logo:joi.object({
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
const getBrandVal =joi.object({
    id:joi.string().hex().length(24).required(),
    })

    const updateBrandVal =joi.object({
        name:joi.string().min(3).max(50),
        logo:joi.object({
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
    }).or('name','logo');

    const deleteBrandVal =joi.object({
        id:joi.string().hex().length(24).required(),
        })
    
export {
    addBrandVal,getBrandVal,updateBrandVal,deleteBrandVal
}