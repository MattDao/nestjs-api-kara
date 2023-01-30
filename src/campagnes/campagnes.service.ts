import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampagneDto } from './dto/create-campagne.dto';
import { UpdateCampagneDto } from './dto/update-campagne.dto';
import { Campagne } from './entities/campagne.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CampagnesService {
  constructor(
    @InjectRepository(Campagne) 
    private campagneRepository: Repository<Campagne>,
    ) {}
  
  
  // --- Les campagnes sont dans la base de données --- //
    
  async create(
    createCampagneDto: CreateCampagneDto,
    user: User,
    ): Promise<Campagne | string> {
   const { name, style, imgBackground, body } = createCampagneDto;
  const query = this.campagneRepository.createQueryBuilder();
  query.where ( {name}).andWhere({userId: user});
  const existAlready = await query.getOne();

  if (existAlready !== null) {
    return 'Cette campagne existe déjà';
  }
const newCampagne = await this.campagneRepository.create({
  ...createCampagneDto,
  userId: user,
});
return await this.campagneRepository.save(newCampagne);
    } 
  
    async findAllCampagneByUser(
      user: User,
      ): Promise<Campagne[]> {
        const campagneFound = await this.campagneRepository.findBy({
          userId: user,
        });
        console.log('Campagnes trouvées : ', campagneFound);
        if (!campagneFound) {
          throw new NotFoundException('Campagnes non trouvées');
        }
        return campagneFound;
      }
    

  async findOne(
    idValue: string,
    user: User,
    ): Promise<Campagne | string> {
      const campagneFound = await this.campagneRepository.findOne({
        id: idValue,
        userId: user,
      });
      if (!campagneFound) {
        throw new NotFoundException(`Campagne non trouvée avec le nom :${idValue}`,
        );
      }
    return campagneFound;
  }

  async update(
    idValue: string,
    updateCampagneDto: UpdateCampagneDto,
    user: User,
    ): Promise<Campagne | string> {
      console.log('Utilisateur', user);
      const { name } = updateCampagneDto;
      console.log('nom', name);
      const query = this.campagneRepository.createQueryBuilder();
    query.where({ name }).andWhere({ userId: user });
    const existAlready = await query.getOne();
    console.log('mise à jour', existAlready);

    if (existAlready!== null) {
    return `La campagne ${name} existe déjà avec l'utilisateur :${idValue}`;
  }
  const query2 = this.campagneRepository.createQueryBuilder();
    query2.where({ id: idValue }).andWhere({ userId: user });
    const campToUpdate = await query2.getOne();
    console.log('TO UPDATE ', campToUpdate);

    if (!campToUpdate) {
      throw new NotFoundException(`Campagne non trouvée avec l'id:${idValue}`);
    }

    try {
      if (updateCampagneDto.name !== null) {
        campToUpdate.name = updateCampagneDto.name;
      }
      if (updateCampagneDto.style !== null) {
        campToUpdate.style = updateCampagneDto.style;
      }
      if (updateCampagneDto.imgBackground !== null) {
        campToUpdate.imgBackground = updateCampagneDto.imgBackground;
      }
      if (updateCampagneDto.body !== null) {
        campToUpdate.body = updateCampagneDto.body;
      }
      return await this.campagneRepository.save(campToUpdate);
    } catch {
      throw new Error('autre erreur');
    }
  }

  async remove(
    idValue: string,
    user: User,
  ): Promise<Campagne | string> {
    const result = await this.campagneRepository.delete({
      userId: user,
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

  