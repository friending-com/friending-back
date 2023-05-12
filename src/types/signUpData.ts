import { snsURL } from './snsURL';

export interface SignUpData {
  name: string;
  instagram: snsURL;
  twitter: snsURL;
  phone: string;
  facebook: snsURL;
  kakaoTalk: snsURL;
  age: number;
  discord: snsURL;
  line: snsURL;
  naverBlog: snsURL;
  naverBand: snsURL;
  telegram: snsURL;
}

export interface UpdateData {
  id: number;
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
}
