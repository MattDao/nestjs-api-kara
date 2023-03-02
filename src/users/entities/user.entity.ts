import { Campagne } from 'src/campagnes/entities/campagne.entity';
import { Character } from 'src/characters/entities/character.entity';
import { Dice } from 'src/dices/entities/dice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// --- Mise en place des colonnes de l'entité users qui peut etre user ou mj --- //
export enum RoleEnumType {
  USER = 'joueur',
  MJ = 'maitre du jeu',
}

@Entity()
export class User {
  // ---Génration de la clef primaire --- //
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // --- Génération des colonnes de l'entités --- //
  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  pseudo: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
  })
  role: RoleEnumType;

  // ---  Génération des clefs étrangères / en fonction de la cardinalités des tables --- //

  @OneToMany(() => Character, (character) => character.userJ, {
    onDelete: 'CASCADE',
  })
  characterId: Character[];

  @OneToMany(() => Campagne, (campagne) => campagne.userMj, {
    onDelete: 'CASCADE',
  })
  campagneId: Campagne[];

  @OneToMany(() => Dice, (dice) => dice.user, {
    onDelete: 'CASCADE',
  })
  diceId: Dice;
}
