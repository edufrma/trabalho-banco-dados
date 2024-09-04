import express from 'express';
import { signUp, signIn } from '../controllers/auth.controller.js';
import { authSchema } from '../schemas/auth.schema.js';
import { schemaValidation } from '../middlewares/schema.validation.js';

const authRouter = express.Router();

authRouter.post('/sign-up', schemaValidation(authSchema), signUp);
authRouter.post('/login', schemaValidation(authSchema), signIn);

export default authRouter;