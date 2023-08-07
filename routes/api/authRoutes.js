import { Router } from 'express';
import { loginSchema, registerSchema } from '../../schemas/index.js';
import { validateBody, isEmptyBody } from '../../midleware/index.js';
const authRouter = Router();

authRouter.post('/register', isEmptyBody, validateBody(registerSchema));



export default authRouter;