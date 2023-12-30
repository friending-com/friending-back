import { IsInt } from 'class-validator';

export class WebLinkDTO {
  @IsInt()
  public id: number;
}
