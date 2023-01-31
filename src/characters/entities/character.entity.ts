import { Campagne } from "src/campagnes/entities/campagne.entity";
import { User } from "src/users/entities/user.entity";
import { Item } from "src/items/entities/item.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "src/inventory/entities/inventory.entity";


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
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    imgBackground: string;

    @Column({ 
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    imgCharacter: string;

    @Column({ 
        nullable: false,
        type: 'int',
        length: 2,
    })
    strength: number;

    @Column({ 
        nullable: false,
        type: 'int',
        length: 2,
    })
    dexterity: number;

    @Column({ 
        nullable: false,
        type: 'int',
        length: 2,
    })
    constitution: number;

    @Column({ 
        nullable: false,
        type: 'int',
        length: 2,
    })
    intelligence: number;

    @Column({ 
        nullable: false,
        type: 'int',
        length: 2,
    })
    charisma: number;

    @Column({ 
        nullable: false,
        type: 'int',
        length: 2,
    })
    luck: number;

    @Column({ 
        nullable: false,
        type: 'int',
        length: 2,
    })
    stealth: number;

    @Column({ 
        nullable: false,
        type: 'int',
        length: 2,
    })
    magic: number;

    @ManyToOne(() => User, (chara) => chara.id, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    userId: User;

    @ManyToOne(() => Campagne, (chara) => chara.id, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    campagneId: Campagne;

    @OneToMany(() => Inventory, (inventory) => inventory.id, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    inventory: Inventory;

}


       
    
    


}
