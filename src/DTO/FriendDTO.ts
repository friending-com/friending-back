import { IsInt } from 'class-validator';

export class FriendAddDTO {
  @IsInt()
  public userProfileId: number;
  @IsInt()
  public subProfileId: number;
}
export class FriendGetAllDTO {
  @IsInt()
  public userId: number;
}
export class FriendGetDTO {
  @IsInt()
  public profileId: number;
}