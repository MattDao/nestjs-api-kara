import { Character } from 'src/characters/entities/character.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  // @ManyToMany(() => Character, (character) => character.id, {
  //     nullable: false,
  //     onDelete: 'CASCADE',
  // })
  // characters: Character;

  @ManyToOne(() => User, (item) => item.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  userId: User;
}
