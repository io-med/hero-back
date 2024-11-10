import express from 'express';

import { catchError } from '../utils/catchError.js';
import { imageController } from '../controllers/image.controller.js';
import { imageUpload } from '../utils/multer.js';

export const imageRouter = new express.Router();

imageRouter.get('/:filename',catchError(imageController.get));
imageRouter.post('/:id', imageUpload.single('image'),catchError(imageController.create));
imageRouter.delete('/:id', catchError(imageController.remove));
