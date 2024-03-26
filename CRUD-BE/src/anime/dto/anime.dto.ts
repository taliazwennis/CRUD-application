import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AnimeDto {
  @IsString()
  @MinLength(1, { message: 'Name must have atleast 1 character.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  genres: number[];

  @IsString()
  @MinLength(1, { message: 'Description must have atleast 1 character.' })
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  releaseYear: string;

  @IsInt()
  @IsNotEmpty()
  rating: number;
}
