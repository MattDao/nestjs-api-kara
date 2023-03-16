import { Character } from 'src/characters/entities/character.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ManyToMany(() => Character, (character) => character.id, {
    nullable: false,
  })
  characters: Character;
}
