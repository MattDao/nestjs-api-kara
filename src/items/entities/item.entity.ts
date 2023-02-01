import { Inventory } from "src/inventory/entities/inventory.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToMany(() => Inventory, (inventory) => inventory.id, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    inventoryId: Inventory;
}


