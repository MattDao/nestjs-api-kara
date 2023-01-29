import { Injectable } from '@nestjs/common';
import { CreateCampagneDto } from './dto/create-campagne.dto';
import { UpdateCampagneDto } from './dto/update-campagne.dto';

@Injectable()
export class CampagnesService {
  create(createCampagneDto: CreateCampagneDto) {
    return 'This action adds a new campagne';
  }

  findAll() {
    return `This action returns all campagnes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campagne`;
  }

  update(id: number, updateCampagneDto: UpdateCampagneDto) {
    return `This action updates a #${id} campagne`;
  }

  remove(id: number) {
    return `This action removes a #${id} campagne`;
  }
}
