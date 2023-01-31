import { Campagne } from "src/campagnes/entities/campagne.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

        @OneToMany(() => Campagne, (campagnes) => campagnes.diceId, {
            onDelete: 'CASCADE',
          })
          campagneId: Campagne[];

}
