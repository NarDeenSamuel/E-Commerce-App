import joi from "joi"

const signUpVal =joi.object({
    name:joi.string().min(3).max(50).required(),
    email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/).required(),
    password:joi.string().required()
})
const signInVal =joi.object({
    email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/).required(),
    password:joi.string().required()
    })

    const changePasswordVal =joi.object({
        email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/).required(),
        oldPassword:joi.string().required(),
        newPassword:joi.string().required()
        })
    
 
export {
    signInVal,signUpVal,changePasswordVal
}