import { Router } from 'express';
import { validateBody, isEmptyBody, authenticate, upload, updateAvatar } from '../../midleware/index.js';
import { registerSchema, loginSchema, } from '../../schemas/index.js';
import authControllers from '../../controllers/authControllers.js';


const authRouter = Router();

const { register, login, current, logout, avatar, verify } = authControllers;

authRouter.post('/register', isEmptyBody, validateBody(registerSchema), register);
authRouter.get('/verify/:verificationCode', verify);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.get('/current', authenticate, current);
authRouter.post('/logout', authenticate, logout);
authRouter.patch('/avatars', authenticate, upload.single("avatar"), updateAvatar, avatar)

export default authRouter;