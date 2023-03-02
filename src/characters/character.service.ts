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
  ) {}

  // --- Méthode pour créer un personnage --- //
  async create(createCharacterDto: CreateCharacterDto, connectedUser: User) {
    const {
      name,
      imgBackground,
      imgCharacter,
      strength,
      dexterity,
      constitution,
      intelligence,
      charisma,
      luck,
      stealth,
      magic,
    } = createCharacterDto;

    const newChara = await this.CharacterRepository.create({
      name,
      imgBackground,
      imgCharacter,
      strength,
      dexterity,
      constitution,
      intelligence,
      charisma,
      luck,
      stealth,
      magic,
      userJ: connectedUser,
    });
    try {
      return await this.CharacterRepository.save(newChara);
    } catch (error) {
      ("le personnage n'a pas été crée");
    }
  }

  // --- Méthode pour afficher tout les personnages --- //
  async findAllCharacter() {
    const allCharaFound = await this.CharacterRepository.find();
    console.log('Personnages trouvés :', allCharaFound);
    if (!allCharaFound) {
      throw new NotFoundException(`Personnages non trouvé`);
    }
    return allCharaFound;
  }

  // --- Méthode pour trouver un personnage --- //
  async findOne(idvalue: string) {
    try {
      const charaFound = await this.CharacterRepository.findOneBy({
        id: idvalue,
      });
      return charaFound;
    } catch (error) {
      throw new NotFoundException(
        `Aucun personnage trouvé abec le nom ${idvalue}`,
      );
    }
  }

  // --- Méthode pour mettre a jour un personnage --- //
  async update(
    idValue: string,
    updateCharacterDto: UpdateCharacterDto,
    connectedUser: User,
  ) {
    // --- Recherche campagne dans la BDD --- //
    const charaFound = await this.CharacterRepository.findOneBy({
      id: idValue,
      userJ: connectedUser,
    });
    console.log(' user de la requète update :', connectedUser);
    console.log(' personnage trouvée :', charaFound);

    //--- Gestion erreur si pas de campagne dans la BDD --- //
    if (!charaFound) {
      throw new NotFoundException("Ce personnage n'existe pas");
    }

    // --- Gestion erreur si même valeur --- //
    if (charaFound.name === updateCharacterDto.name) {
      throw new Error('Erreur, le nom est le même que precedemment');
    }

    // --- Destructuration de l'update afin de vérifier si il y'a deja une campagne existante --- //
    const {
      name,
      imgBackground,
      imgCharacter,
      strength,
      dexterity,
      constitution,
      intelligence,
      charisma,
      luck,
      stealth,
      magic,
    } = updateCharacterDto;
    console.log('Nom du nouveau personnage :', name);

    if (name) {
      charaFound.name = name;
    }
    if (imgBackground) {
      charaFound.imgBackground = imgBackground;
    }
    if (imgCharacter) {
      charaFound.imgCharacter = imgCharacter;
    }
    if (strength) {
      charaFound.strength = strength;
    }
    if (dexterity) {
      charaFound.dexterity = dexterity;
    }
    if (constitution) {
      charaFound.constitution = constitution;
    }
    if (intelligence) {
      charaFound.intelligence = intelligence;
    }
    if (charisma) {
      charaFound.charisma = charisma;
    }
    if (luck) {
      charaFound.luck = luck;
    }
    if (stealth) {
      charaFound.stealth = stealth;
    }
    if (magic) {
      charaFound.magic = magic;
    }

    try {
      return await this.CharacterRepository.save(charaFound);
    } catch (error) {
      ` les données ne sont pas mises à jour`;
      console.log(error);
    }
  }

  // --- Méthode pour supprimer un personnage --- //
  async remove(idvalue: string, user: User): Promise<Character | string> {
    const result = await this.CharacterRepository.delete({
      userJ: user,
      id: idvalue,
    });
    {
      if (result.affected === 0) {
        throw new NotFoundException(
          `Aucun personnage trouvé abec le nom ${idvalue}`,
        );
      }
      return `Le personnage avec le nom ${idvalue} à été supprimé`;
    }
  }
}
