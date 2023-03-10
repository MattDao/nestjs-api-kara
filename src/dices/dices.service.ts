import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDiceDto } from './dto/create-dice.dto';
import { UpdateDiceDto } from './dto/update-dice.dto';
import { Dice } from './entities/dice.entity';
import { Campagne } from 'src/campagnes/entities/campagne.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class DicesService {
  constructor(
    @InjectRepository(Dice)
    private dicesRepository: Repository<Dice>,
  ) {}

  async create(
    createDiceDto: CreateDiceDto,
    user: User,
  ): Promise<Dice | string> {
    const { nameSet, value } = createDiceDto;
    const query = this.dicesRepository.createQueryBuilder();
    query.where({ nameSet }).andWhere({ campId: Campagne });
    const existAlready = await query.getOne();

    if (existAlready !== null) {
      return 'Le set de Dés existe déjà';
    }

    const newDice = await this.dicesRepository.create({
      ...createDiceDto,
      user,
    });
    return await this.dicesRepository.save(newDice);
  }

  async findAllDicesByUser(user: User): Promise<Dice[]> {
    const diceFound = await this.dicesRepository.findBy({
      user: user,
    });
    console.log(' dés trouvés', diceFound);
    if (!diceFound) {
      throw new NotFoundException('Dés non trouvés');
    }
    return diceFound;
  }

  async findOne(idValue: string, user: User): Promise<Dice | string> {
    const diceFound = await this.dicesRepository.findOneBy({
      id: idValue,
      user: user,
    });
    if (!diceFound) {
      throw new NotFoundException('Dés non trouvés');
    }
    return diceFound;
  }

  async remove(idValue: string, user: User): Promise<Dice | string> {
    const result = await this.dicesRepository.delete({
      id: idValue,
      user: user,
    });
    if (result.affected === 0) {
      throw new NotFoundException('Dés non trouvés');
    }
    return `Vous avez supprimé ${idValue}`;
  }
}
