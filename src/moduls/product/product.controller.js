import slugify from "slugify"
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Product } from "../../../dbConnection/models/product.model.js"
import { removeFileFromFolder, removeFilesFromFolder } from "../../utils/removeFile.js"
import path from "path"
import { deleteOne, getOne } from "../handlers/handler.js"
import { ApiFeature } from "../../utils/apiFeatures.js"




const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.createdBy = req.user._id
    req.body.images = req.files.images.map( img => img.filename)
    let product = new Product(req.body)
    await product.save()
    res.json({ message: 'success',product})
})

const getProducts = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeature(Product.find(), req.query).pagination().search().filter().sort().fields();
    let products = await apiFeature.mongooseQuery;
    res.json({ message: "success", page: apiFeature.pageNumber, products });
});
const getProduct = getOne(Product)


const updateProduct = catchError(async (req, res, next) => {
    if (req.body.title) {req.body.slug = slugify(req.body.title);}
    if (req.files.imgCover && req.files.imgCover.length > 0) {
        let product = await Product.findById(req.params.id);
        if (!product) return next(new appError("Product not found", 404));
        req.body.imgCover = req.files.imgCover[0].filename;
        if (product.imgCover) {
            const url = product.imgCover;
            const folderPath = path.join('uploads', 'products');
            const fileName = url.split('/').pop();
            removeFilesFromFolder(folderPath, [fileName]); 
        }
    }
    if (req.files.images && req.files.images.length > 0) {
        req.body.images = req.files.images.map(img => img.filename);
        let product = await Product.findById(req.params.id);
        if (!product) return next(new appError("Product not found", 404));
        const fileNames = product.images.map(url => {
            const parts = url.split('/');
            return parts[parts.length - 1]; 
        });
        const folderPath = path.join('uploads', 'products');
        removeFilesFromFolder(folderPath, fileNames);
    }

    let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return next(new appError("Product not found", 404));

    res.json({ message: 'success', product });
});


const deleteProduct = deleteOne(Product)



export {
addProduct,getProduct,getProducts,updateProduct,deleteProduct
}