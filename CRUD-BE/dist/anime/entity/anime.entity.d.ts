import { Genres } from '../..//genres/entity/genres.entity';
export declare class Anime {
    id: number;
    name: string;
    genres: Genres[];
    description: string;
    releaseYear: string;
    rating: number;
}
