import { IsString } from 'class-validator';

export class CallBackPostDTO {
  @IsString()
  platform: string;
  @IsString()
  accessToken: string;
}
