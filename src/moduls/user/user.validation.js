import joi from "joi"

const addUserVal =joi.object({
    name:joi.string().min(3).max(50).required(),
    email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/).required(),
    password:joi.string().required(),
    role:joi.string().pattern(/(user|admin)/).optional()
})
const getUserVal =joi.object({
    id:joi.string().hex().length(24).required(),
    })

    const updateUserVal =joi.object({
        name:joi.string().min(3).max(50),
        role:joi.string().pattern(/(user|admin)/), 
        id:joi.string().hex().length(24).required(),
        password:joi.string()
    }).or('name','role','password');

    const deleteUserVal =joi.object({
        id:joi.string().hex().length(24).required(),
        })
    
export {
    addUserVal,getUserVal,updateUserVal,deleteUserVal
}