import { IsInt, IsString } from 'class-validator';

export class CategoryGetAllDTO {
  @IsInt()
  public userId: number;
}

export class CategoryDTO {
  @IsInt()
  public userId: number;
  @IsInt()
  public categoryId: number;
}

export class CategoryAddDTO {
  @IsString()
  public name: string;
  @IsInt()
  public userId: number;
}

export class CategoryFriendAddDTO {
  @IsInt()
  public userId: number;
  @IsInt()
  public categoryId: number;
  @IsInt()
  public friendProfileId: number;
}
