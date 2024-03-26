import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre.dto';
export declare class GenresController {
    private readonly genreService;
    constructor(genreService: GenresService);
    create(genreDto: GenreDto): Promise<import("src/genres/entity/genres.entity").Genres>;
    findAll(): Promise<import("src/genres/entity/genres.entity").Genres[]>;
    findOne(id: string): Promise<import("src/genres/entity/genres.entity").Genres>;
    update(id: string, genreDto: GenreDto): Promise<import("src/genres/entity/genres.entity").Genres>;
    remove(id: string): Promise<void>;
}
