import { IsInt, IsString } from 'class-validator';

export class FCMTokenDTO {
  @IsInt()
  id: number;
  @IsString()
  token: string;
}
