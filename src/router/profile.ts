import express, { Request, Response } from 'express';
import { findProfile } from '../services/profile/findProfile';
import errorHandler from './errorHandler';
import { UserController } from '../controllers/UserController';
const router = express.Router();

router.get('/', errorHandler(UserController.profile));
export { router as profile };
