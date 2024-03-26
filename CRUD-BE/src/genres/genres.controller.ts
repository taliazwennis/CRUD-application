import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Post()
  create(@Body() genreDto: GenreDto) {
    return this.genreService.createGenre(genreDto);
  }

  @Get()
  findAll() {
    return this.genreService.findAllGenres();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findGenreById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() genreDto: GenreDto) {
    return this.genreService.updateGenre(+id, genreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.deleteGenre(+id);
  }
}
