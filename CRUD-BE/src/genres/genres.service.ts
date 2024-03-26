import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genres } from './entity/genres.entity';
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genres)
    private readonly genreRepository: Repository<Genres>,
  ) {}

  async findAllGenres(): Promise<Genres[]> {
    return this.genreRepository.find();
  }

  async findGenreById(id: number): Promise<Genres> {
    return this.genreRepository.findOneBy({ id });
  }

  async createGenre(genreDto: GenreDto): Promise<Genres> {
    const genre = this.genreRepository.create(genreDto);
    return this.genreRepository.save(genre);
  }

  async updateGenre(id: number, genreDto: GenreDto): Promise<Genres> {
    const genre = await this.genreRepository.findOneBy({ id });
    if (!genre) {
      throw new Error('Genre not found');
    }
    genre.name = genreDto.name;
    return this.genreRepository.save(genre);
  }

  async deleteGenre(id: number): Promise<void> {
    await this.genreRepository.delete(id);
  }
}
