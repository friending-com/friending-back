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
import { image } from './image';
import { category } from './category';
import { categories } from './categories';
import { fcmToken } from './fcmToken';
import { friending } from './friending';

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
router.use('/image', image);
router.use('/category', category);
router.use('/categories', categories);
router.use('/fcmToken', fcmToken);
router.use('/friending', friending);

export default router;
