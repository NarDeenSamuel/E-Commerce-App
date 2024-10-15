import joi from "joi"

const addProductVal =joi.object({
    title:joi.string().min(3).max(50).required(),
    decription:joi.string().min(20).max(500).required(),
    price:joi.number().required(),
    priceAfterDiscount:joi.number().required(),
    stock:joi.number().required(),
    rateAvg:joi.number().min(0).max(5).required(),
    rateCount:joi.number().min(0).max(5).required(),
    category:joi.string().hex().length(24).required(),
    brand:joi.string().hex().length(24).required(),
    subcategory:joi.string().hex().length(24).required(),
    imgCover:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().valid('image/jpeg','image/png','image/jpg','image/gif').required(),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    }).required(),
    images: joi.array().items(joi.object({ 
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg', 'image/gif').required(),
        size: joi.number().max(5242880).required(), 
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    })).min(1).required() 
})


const getProductVal =joi.object({
    id:joi.string().hex().length(24).required(),
    })

    const updateProductVal = joi.object({
        title: joi.string().min(3).max(50).required(),
        decription: joi.string().min(20).max(500).required(),
        price: joi.number().required(),
        priceAfterDiscount: joi.number().required(),
        stock: joi.number().required(),
        rateAvg: joi.number().min(0).max(5).required(),
        rateCount: joi.number().min(0).max(5).required(),
        category: joi.string().hex().length(24).required(),
        brand: joi.string().hex().length(24).required(),
        subcategory: joi.string().hex().length(24).required(),
        
        // Make imgCover optional but still validate it if present
        imgCover: joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().valid('image/jpeg','image/png','image/jpg','image/gif').required(),
            size: joi.number().max(5242880).required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required(),
        }).optional(), // Optional imgCover field
        
        // Make images optional but still validate if present
        images: joi.array().items(joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/jpg', 'image/gif').required(),
            size: joi.number().max(5242880).required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required(),
        })).min(1).optional(), // Optional images array
    
        id: joi.string().hex().length(24).required(),
    }).or('title', 'decription', 'price', 'priceAfterDiscount', 'stock', 'rateAvg', 'rateCount', 'category', 'brand', 'subcategory', 'images', 'imgCover');
    
    const deleteProductVal =joi.object({
        id:joi.string().hex().length(24).required(),
        })
    
export {
    addProductVal,getProductVal,updateProductVal,deleteProductVal
}