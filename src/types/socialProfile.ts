export interface GoogleProfile {
  email: string;
  name: string;
  picture: string;
}
export interface KakaoResponse {
  id: string;
  kakao_account: KakaoProfile;
}
export interface KakaoProfile {
  profile: {
    nickname: string;
    profile_image_url: string;
  };
  name: string;
  email: string;
  gender: string;
  birthday: string;
}
