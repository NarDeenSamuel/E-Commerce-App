import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"

export const deleteOne = (model) => {
    return catchError(async (req, res, next) => {
        let document = await model.findByIdAndDelete(req.params.id)
        document || next(new appError("document not found", 404))
        !document || res.json({ message: 'successs', document })
    })

}



export const getOne = (model) => {
    return catchError(async (req, res, next) => {
        let document = await model.findById(req.params.id)
        document || next(new appError("document not found", 404))
        !document || res.json({ message: 'successs', document })
    })
}


// export const getAll = (model) => {
//     return catchError(async (req, res, next) => {
        // //=============== pagination =============== //


        // let pageNumber = req.query.page * 1 || 1
        // if (pageNumber < 1) pageNumber = 1
        // const limit = 5
        // let skip = (parseInt(pageNumber) - 1) * limit

        //=============== filter =============== //

        // let filter = structuredClone(req.query)
        // filter = JSON.stringify(filter)
        // filter = filter.replace(/(gt|gte|lt|lte)/, value => `$${value}`)
        // filter = JSON.parse(filter)
        // let excludedFields = ['page', 'sort', 'fields', 'search']
        // excludedFields.forEach(val => delete filter[val])
        // let mongooseQuery = model.find(filter).skip(skip).limit(limit);
        // let totalDocuments = await model.find(filter)
        // totalDocuments = totalDocuments.length;
         
        //=============== sort =============== //

        // if (req.query.sort) {
        //     let sortedBy = req.query.sort.split(',').join(' ');
        //     mongooseQuery = mongooseQuery.sort(sortedBy);
        // }

        //=============== fields =============== //

        // if (req.query.fields) {
        //     let selectedFields = req.query.fields.split(',').join(' ');
        //     mongooseQuery = mongooseQuery.select(selectedFields);
        // }
        //=============== search =============== //

        // if (req.query.search) {
        //    mongooseQuery = mongooseQuery.find(
        //     {
        //         $or:[
        //             {title:{$regex:req.query.search, $options : 'i'}},
        //             {name:{$regex:req.query.search, $options : 'i'}},
        //             {decription:{$regex:req.query.search , $options : 'i'}}
        //         ]
        //     }
        //    )
        //    totalDocuments = await model.find( {
        //     $or:[
        //         {title:{$regex:req.query.search, $options : 'i'}},
        //         {name:{$regex:req.query.search, $options : 'i'}},
        //         {decription:{$regex:req.query.search , $options : 'i'}}
        //     ]
        // })
        // totalDocuments = totalDocuments.length;
        // }

        // let documents = await mongooseQuery;

//         res.json({ message: 'success', documents, pageNumber, totalDocuments, totalPages: Math.ceil(totalDocuments / limit) })
//     }
//     )
// }