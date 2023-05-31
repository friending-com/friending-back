import { Router } from 'express';
import { signup } from './signUp';
import { friend } from './friend';
import { hashTag } from './hashTag';
import { profile } from './profile';
import { profiles } from './profiles';
import { friends } from './friends';

const router = Router();

router.use('/signup', signup);
router.use('/profile', profile);
router.use('/friends', friends);
router.use('/friend', friend);
router.use('/hashtag', hashTag);
router.use('/profiles', profiles);

export default router;
