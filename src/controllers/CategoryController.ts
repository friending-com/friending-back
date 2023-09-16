import { Request, Response } from 'express';
import {
  categoryGetAllValidation,
  categoryGetValidation,
  categoryMakeValidation,
  categoryRemoveAllValidation,
} from '../DTO/validations/category';
import { CategoryService } from '../services/CategoryService';

export class CategoryController {
  static async get(req: Request, res: Response) {
    const cateogyrId = await categoryGetValidation(req);
    const result = await CategoryService.getCategory(cateogyrId);
    res.json(result);
  }

  static async getAll(req: Request, res: Response) {
    const userId = await categoryGetAllValidation(req);
    const result = await CategoryService.getAllCategory(userId);
    res.json(result);
  }

  static async make(req: Request, res: Response) {
    const { id, name } = await categoryMakeValidation(req);
    const result = await CategoryService.makeCategory(id, name);
    res.json(result);
  }

  static async removeAll(req: Request, res: Response) {
    const { id, categoryId } = await categoryRemoveAllValidation(req);
    const result = await CategoryService.removeCategory(id, categoryId);
    res.json(result);
  }

  static async add(req: Request, res: Response) {
    const { friendId, categoryId } = req.body;
    const result = await CategoryService.addFriendCategory(
      friendId,
      categoryId
    );
    res.json(result);
  }
  static async remove(req: Request, res: Response) {
    const { friendId, categoryId } = req.body;
    const result = await CategoryService.removeFriendCategory(
      friendId,
      categoryId
    );
    res.json(result);
  }
}
