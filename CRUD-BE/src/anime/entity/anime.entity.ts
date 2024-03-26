import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genres } from '../..//genres/entity/genres.entity';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @ManyToMany(() => Genres, (genre) => genre.animes)
  @JoinTable()
  genres: Genres[];

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  releaseYear: string;

  @Column({ type: 'int' })
  rating: number;
}
