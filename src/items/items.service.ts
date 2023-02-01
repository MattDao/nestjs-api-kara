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
    private ItemRepository: Repository<Item>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async create(
    createItemDto: CreateItemDto,
    user: User,
    ): Promise<Item | string> {
      const {name} = createItemDto;
      const query = this.ItemRepository.createQueryBuilder();
      query.where({name}).andWhere({userId: user});
      const existAlready = await query.getOne();

      if (existAlready !== null) {
        return 'Cet objet existe déjà';
      }
      const newItem = await this.ItemRepository.create({
        ...createItemDto,
        userId: user,
      });
    return await this.ItemRepository.save(newItem);
  }

  async findAllByUser(
    user: User,
    ): Promise<Item[]> {
      const itemFound = await this.ItemRepository.findBy({
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
      const itemFound = await this.ItemRepository.findOneBy({
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
      const result = await this.ItemRepository.delete({
        userId: user,
        id: idValue,
      });
      if (result.affected === 0) {
        throw new NotFoundException(`l'objet ${idValue} n'existe pas `);
      }
    return `L'objet ${id} à été supprimé`;
  }
}
