import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GenreDto {
  @IsString()
  @MinLength(1, { message: 'Name must have atleast 1 character.' })
  @IsNotEmpty()
  name: string;
}
