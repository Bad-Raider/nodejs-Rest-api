import { Router } from 'express';
import { validateBody, isEmptyBody } from '../../midleware/index.js';
import { registerSchema } from '../../schemas/index.js';
import authControllers from '../../controllers/authControllers.js';


const authRouter = Router();
const { register } = authControllers;

authRouter.post('/register', isEmptyBody, validateBody(registerSchema), register);



export default authRouter;