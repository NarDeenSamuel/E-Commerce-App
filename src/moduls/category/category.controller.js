import { Category } from "../../../dbConnection/models/category.model.js"
import slugify from "slugify"
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import path from "path"
import { removeFileFromFolder } from "../../utils/removeFile.js"
import { deleteOne, getOne } from "../handlers/handler.js"
import { ApiFeature } from "../../utils/apiFeatures.js"



const addCategory = catchError(async (req, res, next) => {
   
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    req.body.createdBy = req.user._id
    let category = new Category(req.body)
    await category.save()
    res.status(201).json({ message: 'success',category}) 
    
})

const getCategories = catchError(async(req,res,next)=>{
    let apiFeature = new ApiFeature(Category.find(), req.query).pagination().search().filter().sort().fields();
    let categories = await apiFeature.mongooseQuery;
    res.json({ message: "success", page: apiFeature.pageNumber, categories });

})

const getCategory = getOne(Category)

const updateCategory = catchError(async (req, res, next) => {
    if(req.body.name) req.body.slug = slugify(req.body.name)

    if(req.file && req.file.filename) 
        {
            req.body.image = req.file.filename
            let category = await Category.findById(req.params.id)
            const url = category.image
            const folderPath = path.join('uploads', 'categories');
             const fileName = url.split('/').pop();
             removeFileFromFolder(folderPath, fileName);
        }
        
    let category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    category || next(new appError("category not found",404))
    !category || res.json({ message: 'successs', category })
})



const deleteCategory = deleteOne(Category)





export {
    addCategory,getCategories,getCategory,updateCategory,deleteCategory
}