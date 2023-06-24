import { IsInt } from 'class-validator';

export class FriendAddDTO {
  @IsInt()
  public userId: number;
  @IsInt()
  public subId: number;
}
export class FriendGetAllDTO {
  @IsInt()
  public userId: number;
}
