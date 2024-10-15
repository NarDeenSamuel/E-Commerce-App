import { appError } from "../utils/appError.js";

export const validateData = (schema, options = {}) => {
    return (req, res, next) => {
        const { imageField, logoField, productImagesField } = options;
        let dataToValidate = {...req.body,...req.params,...req.query};
        if (imageField && req.file) {
            dataToValidate[imageField] = req.file;
        }
        if (logoField && req.file) {
            dataToValidate[logoField] = req.file;
        }
        if (productImagesField && req.files) {
            const imgCover = req.files.imgCover ? req.files.imgCover[0] : undefined;
            const images = req.files.images || [];
            dataToValidate.imgCover = imgCover;
            dataToValidate.images = images.length > 0 ? images : undefined;
        }

        const { error } = schema.validate(dataToValidate, { abortEarly: false });
        if (!error) {
            next();
        } else {
            const errMsgs = error.details.map(detail => detail.message);
            return next(new appError(errMsgs, 401));
        }
    };
};
