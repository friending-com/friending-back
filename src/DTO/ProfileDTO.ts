import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class ProfileCreateDTO {
  @IsInt()
  public userId: number;
  @IsBoolean()
  public isPublic: boolean;
  @IsBoolean()
  public isMain: boolean;
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
}
export class ProfileModifyDTO {}
