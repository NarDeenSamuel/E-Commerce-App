import slugify from "slugify"
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from "../../../dbConnection/models/subcategory.model.js"
import { deleteOne, getOne } from "../handlers/handler.js"
import { ApiFeature } from "../../utils/apiFeatures.js"


const addSubCategory = catchError(async (req, res, next) => {
    req.body.createdBy = req.user._id
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategory(req.body)
    await subCategory.save()
    res.json({ message: 'success',subCategory})
})

const getSubCategories = catchError(async (req, res, next) => {
    let filter = {}
    if(req.params.category) filter.category = req.params.category
        let apiFeature = new ApiFeature(SubCategory.find(filter), req.query).pagination().search().filter().sort().fields();
        let subcategories = await apiFeature.mongooseQuery;
        res.json({ message: "success", page: apiFeature.pageNumber, subcategories });
 
}
)

const getSubCategory = getOne(SubCategory)

const updateSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subCategory || next(new appError("subcategory not found",404))
    !subCategory || res.json({ message: 'successs', subCategory })
})



const deleteSubCategory = deleteOne(SubCategory)



export {
addSubCategory,getSubCategories,getSubCategory,updateSubCategory,deleteSubCategory
}