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
  @IsOptional()
  @IsString()
  public phone: string;
  @IsOptional()
  @IsString()
  public kakaoTalk: string;
  @IsOptional()
  @IsString()
  public instagram: string;
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
  public hashTags: string[];
  @IsOptional()
  @IsString()
  public image: string;
}
export class ProfileModifyDTO {
  @IsInt()
  public userId: number;
  @IsInt()
  public id: number;
  @IsBoolean()
  @IsOptional()
  public isPublic: boolean;
  @IsOptional()
  @IsString()
  public phone: string;
  @IsOptional()
  @IsString()
  public kakaoTalk: string;
  @IsOptional()
  @IsString()
  public instagram: string;
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
  public hashTags: string[];
}

export class ProfileDeleteDTO {
  @IsInt()
  public id: number;
  @IsInt()
  public proifleId: number;
}
