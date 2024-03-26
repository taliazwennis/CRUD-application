import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AnimeDto } from './dto/anime.dto';
import { Anime } from './entity/anime.entity';
import { Genres } from 'src/genres/entity/genres.entity';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime)
    private readonly animeRepository: Repository<Anime>,
    @InjectRepository(Genres)
    private readonly genreRepository: Repository<Genres>,
  ) {}

  async createAnime(animeDto: AnimeDto): Promise<Anime> {
    const anime: Anime = new Anime();
    anime.name = animeDto.name;
    anime.description = animeDto.description;
    anime.rating = animeDto.rating;
    anime.releaseYear = animeDto.releaseYear;
    anime.genres = await Promise.all(
      animeDto.genres.map(async (genreId: number) =>
        this.genreRepository.findOneBy({ id: genreId }),
      ),
    );
    return this.animeRepository.save(anime);
  }

  findAllAnime(filter: string): Promise<Anime[]> {
    if (!filter) {
      return this.animeRepository.find({ relations: ['genres'] });
    }
    return this.animeRepository.find({
      where: { name: ILike(`%${filter}%`) },
      relations: ['genres'],
    });
  }

  findAnimeById(id: number): Promise<Anime> {
    return this.animeRepository.findOne({
      where: {
        id,
      },
      relations: ['genres'],
    });
  }

  async updateAnime(id: number, animeDto: AnimeDto): Promise<Anime> {
    const anime = await this.animeRepository.findOneBy({ id });
    anime.name = animeDto.name;
    anime.description = animeDto.description;
    anime.rating = animeDto.rating;
    anime.releaseYear = animeDto.releaseYear;
    anime.genres = await Promise.all(
      animeDto.genres.map(async (genreId: number) =>
        this.genreRepository.findOneBy({ id: genreId }),
      ),
    );
    return this.animeRepository.save(anime);
  }

  deleteAnime(id: number): Promise<{ affected?: number }> {
    return this.animeRepository.delete(id);
  }
}
