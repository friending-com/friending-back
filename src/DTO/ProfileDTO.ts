import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
export class ProfileGetAllDTO {
  @IsInt()
  public userId: number;
}
export class ProfileGetDTO {
  @IsInt()
  public id: number;
}
export class ProfileCreateDTO {
  @IsInt()
  public userId: number;
  @IsBoolean()
  public isPublic: boolean;
  @IsString()
  public usage: string;
  @IsString()
  public nickName: string;
  @IsString()
  public name: string;
  @IsOptional()
  @IsString()
  public phone: string;
  @IsOptional()
  @IsString()
  public kakaoTalk: string;
  @IsOptional()
  @IsString()
  public email: string;
  @IsOptional()
  @IsString()
  public info: string;
  @IsOptional()
  @IsString()
  public thread: string;
  @IsOptional()
  @IsString()
  public facebook: string;
  @IsOptional()
  @IsString()
  public line: string;
  @IsOptional()
  @IsString()
  public discord: string;
  @IsOptional()
  @IsString()
  public naverBlog: string;
  @IsOptional()
  @IsString()
  public naverBand: string;
  @IsOptional()
  @IsString()
  public telegram: string;
  @IsOptional()
  @IsString()
  public twitter: string;
  @IsOptional()
  @IsString()
  public workSpace: string;
  @IsOptional()
  @IsString()
  public instagram: string;
  @IsOptional()
  public hashTags: string[];
  @IsOptional()
  @IsString()
  public image: string;
}
export class ProfileModifyDTO extends ProfileCreateDTO {
  @IsInt()
  public id: number;
  @IsBoolean()
  @IsOptional()
  public isPublic: boolean;
  @IsString()
  @IsOptional()
  public usage: string;
  @IsString()
  @IsOptional()
  public nickName: string;
  @IsString()
  @IsOptional()
  public name: string;
}

export class ProfileDeleteDTO {
  @IsInt()
  public id: number;
  @IsInt()
  public profileId: number;
}
