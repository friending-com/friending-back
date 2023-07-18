import { snsURL } from './snsURL';

export interface UpdateData {
  id: number;
  userId: number;
  email?: string;
  nickName?: string;
  name?: string;
  instagram?: snsURL;
  twitter?: snsURL;
  phone?: string;
  facebook?: snsURL;
  kakaoTalk?: snsURL;
  age?: number;
  discord?: snsURL;
  line?: snsURL;
  naverBlog?: snsURL;
  naverBand?: snsURL;
  telegram?: snsURL;
  isPublic?: boolean;
}

export interface ProfileCreateData {
  email: string;
  name: string;
  nickName: string;
  workSpace: string;
  userId: number;
  instagram: snsURL;
  twitter: snsURL;
  phone: string;
  facebook: snsURL;
  kakaoTalk: snsURL;
  discord: snsURL;
  line: snsURL;
  naverBlog: snsURL;
  naverBand: snsURL;
  telegram: snsURL;
  hashTags: string[];
  isPublic: boolean;
}
