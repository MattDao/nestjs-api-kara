import { Campagne } from "src/campagnes/entities/campagne.entity";
import { Character } from "src/characters/entities/character.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum RoleEnumType {
    USER = 'user',
   MJ = 'mj',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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


// --- Clefs étrangères --- //

@OneToMany(() => Character, (character) => character.userId, {
  onDelete: 'CASCADE',
})
character: Character[];

@OneToMany(() => Campagne, (campagne) => campagne.userId, {
  onDelete: 'CASCADE',
})
campagne: Campagne[];
  taches: any;
}



