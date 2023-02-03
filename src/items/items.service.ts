import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createItemDto: CreateItemDto,
    
    ): Promise<Item | string> {
      const {name} = createItemDto;
      const query = this.itemRepository.createQueryBuilder();
      query.where({name});
      const existAlready = await query.getOne();

      if (existAlready !== null) {
        return 'Cet objet existe déjà';
      }
      const newItem = await this.itemRepository.create({
        ...createItemDto,
        
      });
    return await this.itemRepository.save(newItem);
  }

  async findAllByUser(
    user: User,
    ): Promise<Item[]> {
      const itemFound = await this.itemRepository.findBy({
        userId: user,
      });
      if (!itemFound) {
        throw new NotFoundException(`Aucun objet trouvé `);
      }
 return itemFound;
    }

  async findOne(
    idValue: string,
    user: User,
    ): Promise<Item | string> {
      const itemFound = await this.itemRepository.findOneBy({
        id: idValue,
        userId: user,
      });
      if (!itemFound) {
        throw new NotFoundException(`l'objet ${idValue} n'existe pas `);
      }
    return itemFound;
  }

  /*update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }*/

  async remove(
    idValue: string,
    user: User,
    ): Promise<Item | string> {
      const result = await this.itemRepository.delete({
        userId: user,
        id: idValue,
      });
      if (result.affected === 0) {
        throw new NotFoundException(`l'objet ${idValue} n'existe pas `);
      }
    return `L'objet ${idValue} à été supprimé`;
  }
}
