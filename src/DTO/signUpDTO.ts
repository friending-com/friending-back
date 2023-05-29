import { IsInt, Length, Min, isInt } from 'class-validator';

export class SignUpDTO {
  @Length(1, 20)
  public name: string;
  @IsInt()
  @Min(0)
  public age: number;
}
