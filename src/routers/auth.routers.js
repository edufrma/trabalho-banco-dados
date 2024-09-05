import express from 'express';
import multer from 'multer';
import { signUp, signIn } from '../controllers/auth.controller.js';
import { authSchema } from '../schemas/auth.schema.js';
import { schemaValidation } from '../middlewares/schema.validation.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authRouter = express.Router();
authRouter.post('/sign-up', upload.single('foto'), schemaValidation(authSchema), signUp);
authRouter.post('/login', schemaValidation(authSchema), signIn);

export default authRouter;
