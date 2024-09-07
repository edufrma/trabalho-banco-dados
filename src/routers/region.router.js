import express from 'express';
import { getAllRegions } from '../controllers/region.controller.js';

const regionRouter = express.Router();

regionRouter.get('/regions', getAllRegions);

export default regionRouter;
