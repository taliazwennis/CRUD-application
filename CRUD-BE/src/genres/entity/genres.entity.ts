import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Anime } from '../../anime/entity/anime.entity';

@Entity()
export class Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Anime, (anime) => anime.genres)
  animes: Anime[];
}
