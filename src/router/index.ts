import { Router } from 'express';
import { signup } from './signUp';
import { friend } from './friend';
import { hashTag } from './hashTag';
import { profile } from './profile';

const router: Router = Router();
router.use('/signup', signup);
router.use('/profile', profile);
router.use('/friend', friend);
router.use('/hashtag', hashTag);

export default router;
