import { Dice } from "src/dices/entities/dice.entity";
import { User } from "src/users/entities/user.entity";
import { Character } from "src/characters/entities/character.entity";
import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
export class Campagne {
    @PrimaryGeneratedColumn('uuid') // La fonction uuid est une dependencie et transforme l'Id de type number en type string.
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
        nullable: false,
        type: 'varchar',
        length: 255,
        })
    imgBackground: string;

    @Column({
        nullable: false,
        type: 'text',
      })
      body: string;
  
    @ManyToOne(() => User, (user) => user.campagne, {
      nullable: false,
      onDelete: 'CASCADE',
    }) 
    userId: User;
    
    @OneToOne(() => Dice, (dice) => dice.campagneId, {
        nullable: false,
        onDelete: 'CASCADE',
    }) 
    diceId: Dice;
  
    @OneToMany(() => Character, (character) => character.campagneId, {
      onDelete: 'CASCADE',
    })
    characterId: Character[];

}
