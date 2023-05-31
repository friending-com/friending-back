import { snsURL } from './snsURL';

export interface UpdateData {
  id: number;
  userId: number;
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
  isMain?: boolean;
}

export interface ProfileCreateData {
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
  isPublic: boolean;
  isMain: boolean;
}
export interface SignUpData {
  name: string;
  age: number;
}
