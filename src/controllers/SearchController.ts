import { Request, Response } from 'express';
import { searchValidation } from '../DTO/validations/search';
import { SearchService } from '../services/SearchService';

export class SearchController {
  static async post(req: Request, res: Response) {
    const searchQuery = await searchValidation(req);
    const result = await SearchService.getSearchResult(searchQuery);
    res.json(result);
  }
}
