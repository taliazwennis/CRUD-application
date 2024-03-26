import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeDto } from './dto/anime.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  create(@Body() animeDto: AnimeDto) {
    return this.animeService.createAnime(animeDto);
  }

  @Get()
  findAll(@Query('filter') filter: string) {
    return this.animeService.findAllAnime(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeService.findAnimeById(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() animeDto: AnimeDto) {
    return this.animeService.updateAnime(+id, animeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeService.deleteAnime(+id);
  }
}
