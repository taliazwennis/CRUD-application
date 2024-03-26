import { AnimeService } from './anime.service';
import { AnimeDto } from './dto/anime.dto';
export declare class AnimeController {
    private readonly animeService;
    constructor(animeService: AnimeService);
    create(animeDto: AnimeDto): Promise<import("src/anime/entity/anime.entity").Anime>;
    findAll(filter: string): Promise<import("src/anime/entity/anime.entity").Anime[]>;
    findOne(id: string): Promise<import("src/anime/entity/anime.entity").Anime>;
    update(id: number, animeDto: AnimeDto): Promise<import("src/anime/entity/anime.entity").Anime>;
    remove(id: string): Promise<{
        affected?: number;
    }>;
}
