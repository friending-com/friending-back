import express, { Express, Request, Response } from 'express';
import UserDAO from '../DAO/UserDAO';
import errorHandler from './errorHandler';
import { UserController } from '../controllers/UserController';
const router = express.Router();

router.post('/', errorHandler(UserController.signup));

export { router as signup };
