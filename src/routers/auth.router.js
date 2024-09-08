import express from 'express';
import multer from 'multer';
import { signUp, signIn, changePassword, uploadPhoto } from '../controllers/auth.controller.js';
import { authSchema } from '../schemas/auth.schema.js';
import { schemaValidation } from '../middlewares/schema.validation.js';
import { tokenValidation } from '../middlewares/token.validation.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authRouter = express.Router();
authRouter.post('/sign-up', upload.single('foto'), schemaValidation(authSchema), signUp);
authRouter.post('/login', schemaValidation(authSchema), signIn);
authRouter.put('/changepassword', tokenValidation, changePassword);

export default authRouter;
