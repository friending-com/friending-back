import { Request, Response } from 'express';

export class NavigateController {
  static post(req: Request, res: Response) {
    const findProfile = req.body;
    const userProfile = req.headers.authorization;
  }
}
