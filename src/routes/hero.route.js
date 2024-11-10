import express from 'express';

import { heroController } from '../controllers/hero.controller.js';
import { catchError } from '../utils/catchError.js';

export const heroRouter = new express.Router();

heroRouter.get('/', catchError(heroController.getAll));
heroRouter.get('/:id', catchError(heroController.getOne));
heroRouter.post('/', catchError(heroController.create));
heroRouter.delete('/:id', catchError(heroController.remove));
heroRouter.put('/:id', catchError(heroController.replace));
heroRouter.patch('/:id', catchError(heroController.update));
