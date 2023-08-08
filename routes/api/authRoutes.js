import { Router } from 'express';
import { validateBody, isEmptyBody } from '../../midleware/index.js';
import { registerSchema, loginSchema } from '../../schemas/index.js';
import authControllers from '../../controllers/authControllers.js';


const authRouter = Router();
const {
    register,
    login, } = authControllers;

authRouter.post('/register', isEmptyBody, validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);


export default authRouter;