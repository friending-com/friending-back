import { IsInt, IsString } from 'class-validator';

export class HashTagPostDTO {
  @IsInt()
  public profileId: number;
  @IsString()
  public hashTagName: string;
  @IsInt()
  public userId: number;
}
export class HashTagGetDTO {
  @IsString()
  public hashTagName: string;
}
export class HashTagDeleteDTO {
  @IsString()
  public hashTagName: string;
  @IsInt()
  public profileId: number;
  @IsInt()
  public userId: number;
}
