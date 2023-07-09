import { Router } from 'express';
import { friend } from './friend';
import { hashTag } from './hashTag';
import { profile } from './profile';
import { profiles } from './profiles';
import { friends } from './friends';
import { search } from './search';
import { navigate } from './navigate';
import { callback } from './callback';
import { refresh } from './refresh';

const router = Router();

router.use('/profile', profile);
router.use('/friends', friends);
router.use('/friend', friend);
router.use('/hashtag', hashTag);
router.use('/profiles', profiles);
router.use('/search', search);
router.use('/navigate', navigate);
router.use('/callback', callback);
router.use('/refresh', refresh);

export default router;
