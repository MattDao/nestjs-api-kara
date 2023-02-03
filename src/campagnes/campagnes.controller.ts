
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { CampagnesService } from './campagnes.service';
import { CreateCampagneDto } from './dto/create-campagne.dto';
import { UpdateCampagneDto } from './dto/update-campagne.dto';
import { User } from 'src/users/entities/user.entity';
import { Campagne } from './entities/campagne.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('campagnes')
export class CampagnesController {
  constructor(private readonly campagnesService: CampagnesService) {}

  @Post()
  create(
    @Body() createCampagneDto: CreateCampagneDto,
  @GetUser() userId: User,
  ): Promise<Campagne | string> {
  console.log('qui est connecte ? ',userId.email)
    return this.campagnesService.create(createCampagneDto, userId);
  }

  @Get()
  findAllCampagneByUser(
    @GetUser() user: User,
  ): Promise<Campagne[]> {
    return this.campagnesService.findAllCampagneByUser(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: User,
    ): Promise<Campagne | string> {
    return this.campagnesService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
     @Body() updateCampagneDto: UpdateCampagneDto,
     @GetUser() user: User,
     ): Promise<Campagne | string> {
    return this.campagnesService.update(id, updateCampagneDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body()
    user: User,
    ) { {
    return this.campagnesService.remove(id, user);
  }
}
}
