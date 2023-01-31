import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private CharacterRepository: Repository<Character>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {

  }
  async create(
    createCharacterDto: CreateCharacterDto,
    user: User,
    ): Promise<Character | string> {
      const { name } = createCharacterDto;
      const query = this.CharacterRepository.createQueryBuilder();
      query.where({ name}).andWhere({ userId: user});
      const existAlready =await query.getOne();

      if (existAlready !== null) {
        return `Vous avez déjà crée ${name} ${user}`;
      }
      const newChara =await this.CharacterRepository.create({
        ...createCharacterDto,
        userId: user,
      });
    return await this.CharacterRepository.save(newChara);
  }

  async findAllByUser(user: User
    ): Promise<Character[]> {
      const charaFound = await this.CharacterRepository.findBy({
         userId: user,
         });
         if (!charaFound) {
          throw new NotFoundException(`Personnage non trouvé`);
         }
    return charaFound;
  }

  async findOne(
    idvalue: string,
    user: User,
    ): Promise<Character | string> {
      const charaFound = await this.CharacterRepository.findOneBy({
        id: idvalue,
        userId: user,
      });
      if (!charaFound) {
        throw new NotFoundException(`Aucun personnage trouvé abec le nom ${idvalue}`);
      }
    return charaFound;
  }

  async update(
    idvalue: string,
     updateCharacterDto: UpdateCharacterDto,
     user: User,
     ): Promise<Character | string> {
      console.log(idvalue);
      console.log('utilisateur : ', user);
      const {name} = updateCharacterDto; //ajouter les stats ?
      console.log('nom : ', name);
      const query = this.CharacterRepository.createQueryBuilder();
      query.where({ name}).andWhere({ userId: user});
      const existAlready =await query.getOne();

      if (existAlready!== null) {
        return `Le personnage ${name} existe déjà avec l'utilisateur ${user}`;
  }
      const query2 = this.CharacterRepository.createQueryBuilder();
      query2.where({ id: idvalue }).andWhere({ userId: user });
      const charaToUpdate = await query2.getOne();
      console.log(charaToUpdate);

      if (!charaToUpdate) {
        throw new NotFoundException(`Aucun personnage trouvé abec le nom ${idvalue}`);
      }
      try {
        if (updateCharacterDto.strength !== null) {
          charaToUpdate.strength = charaToUpdate.strength;
      } else{
        charaToUpdate.strength = updateCharacterDto.strength;
      }
      if (updateCharacterDto.dexterity!== null) {
        charaToUpdate.dexterity = charaToUpdate.dexterity;
        } else{
          charaToUpdate.dexterity = updateCharacterDto.dexterity;
        }
        if (updateCharacterDto.constitution!== null) {
          charaToUpdate.constitution = charaToUpdate.constitution;
          } else{
            charaToUpdate.constitution = updateCharacterDto.constitution;
          }
          if (updateCharacterDto.intelligence!== null) {
            charaToUpdate.intelligence = charaToUpdate.intelligence;
            } else{
              charaToUpdate.intelligence = updateCharacterDto.intelligence;
            }
            if (updateCharacterDto.charisma!== null) {
              charaToUpdate.charisma = charaToUpdate.charisma;
              } else{ 
                charaToUpdate.charisma = updateCharacterDto.charisma;
              }
              if (updateCharacterDto.luck!== null) {
                charaToUpdate.luck = charaToUpdate.luck;
                } else{
                  charaToUpdate.luck = updateCharacterDto.luck;
                }
                if (updateCharacterDto.stealth!== null) {
                  charaToUpdate.stealth = charaToUpdate.stealth;
                  } else{
                  charaToUpdate.stealth = updateCharacterDto.stealth;
                }
                if (updateCharacterDto.magic!== null) {
                  charaToUpdate.magic = charaToUpdate.magic;
                  } else{
                    charaToUpdate.magic = updateCharacterDto.magic;
                  }

      return await this.CharacterRepository.save(charaToUpdate);
    } catch {
      throw new Error('Une autre erreur est survenue');
    }
  }

  async remove(
    idvalue: string,
    user: User,
    ): Promise<Character | string> {
      const result = await this.CharacterRepository.delete({
        userId: user,
        id: idvalue,
      });
      {
      if (result.affected === 0) {
        throw new NotFoundException(`Aucun personnage trouvé abec le nom ${idvalue}`);
      }
    return `Le personnage avec le nom ${idvalue} à été supprimé`;
    }
  }
}

