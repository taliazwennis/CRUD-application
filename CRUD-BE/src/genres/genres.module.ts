import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genres } from './entity/genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genres])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
