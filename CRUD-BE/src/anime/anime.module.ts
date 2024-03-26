import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anime } from './entity/anime.entity';
import { GenresModule } from '../genres/genres.module';
import { Genres } from '../genres/entity/genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anime, Genres]), GenresModule],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
