import { Request, Response } from 'express';
import { SearchService } from '../../services/SearchService';
import { SearchController } from '../SearchController';

describe('SearchController', () => {
  it('post', async () => {
    const req: any = {
      body: {
        searchQuery: '검색어',
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    const result = {
      hashTag: ['검색어', '검색어를 입력하세요www'],
      profiles: [
        {
          id: 1,
          name: '프로필주인장',
        },
      ],
    };

    jest.spyOn(SearchService, 'getSearchResult').mockResolvedValue(result);
    await SearchController.post(req as Request, res as Response);
    expect(SearchService.getSearchResult).toHaveBeenCalledWith('검색어');
    expect(res.json).toHaveBeenCalledWith(result);
  });
});
