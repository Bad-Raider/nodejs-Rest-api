import { Router } from 'express';
import {
    validateBody,
    isEmptyBody,
    authenticate,
    upload,
    updateAvatar,
}
    from '../../midleware/index.js';
import { registerSchema, loginSchema, verifySchema, updateSubscriptionSchema } from '../../schemas/index.js';
import {
    register,
    login,
    current,
    logout,
    avatar,
    verify,
    resentVerifyEmail,
    updateBySubscription,
} from '../../controllers/user/index.js';


const userRouter = Router();


userRouter.post('/register', isEmptyBody, validateBody(registerSchema), register);
userRouter.get('/verify/:verificationCode', verify);
userRouter.post('/verify', validateBody(verifySchema), resentVerifyEmail);
userRouter.post('/login', validateBody(loginSchema), login);
userRouter.get('/current', authenticate, current);
userRouter.post('/logout', authenticate, logout);
userRouter.patch('/avatars', authenticate, upload.single("avatar"), updateAvatar, avatar);
userRouter.patch('/subscription', authenticate, validateBody(updateSubscriptionSchema), updateBySubscription);

export default userRouter;