import { Request, query } from 'express';
import { SearchDTO } from '../SearchDTO';
import { validation } from '.';

export const searchValidation = async (req: Request) => {
  const { searchQuery } = req.body;
  const queryChecker = new SearchDTO();
  queryChecker.searchQuery = searchQuery;
  await validation(queryChecker);
  return searchQuery;
};
