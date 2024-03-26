import { Repository } from 'typeorm';
import { Genres } from './entity/genres.entity';
import { GenreDto } from './dto/genre.dto';
export declare class GenresService {
    private readonly genreRepository;
    constructor(genreRepository: Repository<Genres>);
    findAllGenres(): Promise<Genres[]>;
    findGenreById(id: number): Promise<Genres>;
    createGenre(genreDto: GenreDto): Promise<Genres>;
    updateGenre(id: number, genreDto: GenreDto): Promise<Genres>;
    deleteGenre(id: number): Promise<void>;
}
