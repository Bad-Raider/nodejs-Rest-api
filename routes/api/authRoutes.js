import { Router } from 'express';
import { validateBody, isEmptyBody, authenticate } from '../../midleware/index.js';
import { registerSchema, loginSchema, } from '../../schemas/index.js';
import authControllers from '../../controllers/authControllers.js';


const authRouter = Router();

const { register, login, current, logout } = authControllers;

authRouter.post('/register', isEmptyBody, validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.get('/current', authenticate, current);
authRouter.post('/logout', authenticate, logout);

export default authRouter;