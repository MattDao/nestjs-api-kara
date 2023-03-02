import { Campagne } from 'src/campagnes/entities/campagne.entity';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  imgBackground: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  imgCharacter: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  strength: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  dexterity: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  constitution: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  intelligence: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  charisma: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  luck: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  stealth: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  magic: number;

  @ManyToOne(() => User, (character) => character.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  userJ: User;

  @ManyToOne(() => Campagne, (chara) => chara.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  campagneId: Campagne;

  @ManyToMany(() => Item, { eager: true })
  @JoinTable()
  items: Item[];
}
