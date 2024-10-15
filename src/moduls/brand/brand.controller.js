import slugify from "slugify"
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from "../../../dbConnection/models/brand.model.js"
import path from "path"
import { removeFileFromFolder } from "../../utils/removeFile.js"
import { deleteOne,  getOne } from "../handlers/handler.js"
import { ApiFeature } from "../../utils/apiFeatures.js"


const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    req.body.createdBy=req.user._id
    let brand = new Brand(req.body)
    await brand.save()
    res.json({ message: 'success',brand})
})

const getBrands = catchError(async(req,res,next)=>{
    let apiFeature = new ApiFeature(Brand.find(), req.query).pagination().search().filter().sort().fields();
    let brands = await apiFeature.mongooseQuery;
    res.json({ message: "success", page: apiFeature.pageNumber, brands });

})

const getBrand = getOne(Brand)


const updateBrand = catchError(async (req, res, next) => {
    if(req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) 
        {
            req.body.logo = req.file.filename
            let brand = await Brand.findById(req.params.id)
            const url = brand.logo
            const folderPath = path.join('uploads', 'brands');
             const fileName = url.split('/').pop();
             removeFileFromFolder(folderPath, fileName);
        }
    let brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
    brand || next(new appError("Brand not found",404))
    !brand || res.json({ message: 'successs', brand })
})


const deleteBrand = deleteOne(Brand)


export {
addBrand,getBrands,getBrand,updateBrand,deleteBrand
}