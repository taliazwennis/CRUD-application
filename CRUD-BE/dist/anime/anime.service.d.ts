import { Repository } from 'typeorm';
import { AnimeDto } from './dto/anime.dto';
import { Anime } from './entity/anime.entity';
import { Genres } from 'src/genres/entity/genres.entity';
export declare class AnimeService {
    private readonly animeRepository;
    private readonly genreRepository;
    constructor(animeRepository: Repository<Anime>, genreRepository: Repository<Genres>);
    createAnime(animeDto: AnimeDto): Promise<Anime>;
    findAllAnime(filter: string): Promise<Anime[]>;
    findAnimeById(id: number): Promise<Anime>;
    updateAnime(id: number, animeDto: AnimeDto): Promise<Anime>;
    deleteAnime(id: number): Promise<{
        affected?: number;
    }>;
}
