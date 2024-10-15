import {Router} from 'express'

import { checkEmail } from '../../middleware/checkEmail.js';
import { changeUsePassword, signIn, signUp } from './auth.controller.js';
import { validateData } from '../../middleware/validate.js';
import { changePasswordVal, signInVal, signUpVal } from './auth.validation.js';

const authRouter = Router()


authRouter.post('/signup',validateData(signUpVal),checkEmail,signUp) 
authRouter.post('/signin',validateData(signInVal),signIn) 
authRouter.patch('/changePassword',validateData(changePasswordVal),changeUsePassword) 


export default authRouter;