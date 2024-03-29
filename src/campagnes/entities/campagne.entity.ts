import { User } from 'src/users/entities/user.entity';
import { Character } from 'src/characters/entities/character.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Campagne {
  @PrimaryGeneratedColumn('uuid') // La fonction uuid est une dependence et transforme l'Id de type number en type string.
  id?: string;

  @Column({
    nullable: false, // Ici le typage "nullable"= false indique que l'utilisateur doit obligatoirement remplire le title.
    type: 'varchar',
    length: 50,
  })
  name: string;
  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  style: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  imgBackground: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  body: string;

  @ManyToOne(() => User, (user) => user.campagneId, {
    nullable: false,
  })
  userMj: User;

  @OneToMany(() => Character, (character) => character.campagneId, {})
  characterId: Character[];
}
