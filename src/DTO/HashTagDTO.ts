import { IsInt } from 'class-validator';

export class HashTagPostDTO {
  @IsInt()
  public hashTagName: string;
  public profileId: number;
}
export class HashTagGetDTO {
  @IsInt()
  public hashTagName: string;
}
export class HashTagDeleteDTO {
  @IsInt()
  public hashTagName: string;
  public profileId: number;
}
