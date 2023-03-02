import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampagneDto } from './dto/create-campagne.dto';
import { UpdateCampagneDto } from './dto/update-campagne.dto';
import { Campagne } from './entities/campagne.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CampagnesService {
  constructor(
    @InjectRepository(Campagne)
    private campagneRepository: Repository<Campagne>,
  ) {}

  // --- Méthode pour créer une campagne --- //

  async create(createCampagneDto: CreateCampagneDto, connectedUser: User) {
    const { name, style, imgBackground, body } = createCampagneDto;
    const newCampagne = await this.campagneRepository.create({
      name,
      style,
      imgBackground,
      body,
      userMj: connectedUser,
    });
    console.log('création nouvelle campagne-------- ', newCampagne);

    try {
      return await this.campagneRepository.save(newCampagne);
    } catch (error) {
      ` les données ne sont pas crées`;
      console.log(error);
    }
  }

  // --- Méthode pour afficher toutes les campagnes --- //

  async findAllCampagne(connectedUser: User) {
    const allCampagneFound = await this.campagneRepository.findBy({
      userMj: connectedUser,
    });
    console.log('Campagnes trouvées : ', allCampagneFound);
    if (!allCampagneFound) {
      throw new NotFoundException('Campagnes non trouvées');
    }
    return allCampagneFound;
  }

  // --- Méthode pour afficher une campagne --- //
  async findOne(idValue: string, connectedUser: User) {
    try {
      const campagneFound = await this.campagneRepository.findOneBy({
        id: idValue,
        userMj: connectedUser,
      });
      return campagneFound;
    } catch (error) {
      throw new NotFoundException(
        `Campagne non trouvée avec le nom :${idValue}`,
      );
    }
  }

  // --- Méthode de mise a jour de la campagne --- //

  async update(
    idValue: string,
    updateCampagneDto: UpdateCampagneDto,
    connectedUser: User,
  ) {
    // --- Recherche campagne dans la BDD --- //
    const campagneFound = await this.campagneRepository.findOneBy({
      id: idValue,
      userMj: connectedUser,
    });
    console.log(' user de la requète update :', connectedUser);
    console.log(' campagne trouvée :', campagneFound);

    //--- Gestion erreur si pas de campagne dans la BDD --- //
    if (!campagneFound) {
      throw new NotFoundException("Cette campagne n'existe pas");
    }

    // --- Gestion erreur si même valeur --- //
    if (campagneFound.name === updateCampagneDto.name) {
      throw new Error('Erreur, le nom est le même que precedemment');
    }

    // --- Destructuration de l'update afin de vérifier si il y'a deja une campagne existante --- //
    const { name, style, imgBackground, body } = updateCampagneDto;
    console.log('Nom de la nouvelle campagne :', name);

    if (name) {
      campagneFound.name = name;
    }
    if (body) {
      campagneFound.body = body;
    }
    try {
      return await this.campagneRepository.save(campagneFound);
    } catch (error) {
      ` les données ne sont pas mises à jour`;
      console.log(error);
    }
  }
  async remove(idValue: string, user: User) {
    const result = await this.campagneRepository.delete({
      userMj: user,
      id: idValue,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Campagne non trouvée avec le titre:${idValue}`,
      );
    }
    return `Cette action entraine la suppresion de la campagne:${idValue}`;
  }
}
