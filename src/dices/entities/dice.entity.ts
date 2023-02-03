import { Campagne } from "src/campagnes/entities/campagne.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dice {

        @PrimaryGeneratedColumn('uuid') // La fonction uuid est une dependencie et transforme l'Id de type number en type string.
        id?: string;
      
          @Column({
          nullable: false, // Ici le typage "nullable"= false indique que l'utilisateur doit obligatoirement remplire le title.
          type: 'varchar',
          length: 50,
        })
        nameSet: string;
      
        @Column({
          nullable: false,
        })
        value: number;
      
        // --- Clef étrangères --- //

        @ManyToOne(() => User, (user) => user.diceId, {
            onDelete: 'CASCADE',
          })
          user: User;

        @OneToMany(() => Campagne, (campagne) => campagne.diceId, {
          onDelete: 'CASCADE',
        })
        campagnes: Campagne;

}
