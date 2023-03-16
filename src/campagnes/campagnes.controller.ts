import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CampagnesService } from './campagnes.service';
import { CreateCampagneDto } from './dto/create-campagne.dto';
import { UpdateCampagneDto } from './dto/update-campagne.dto';
import { RoleEnumType, User } from 'src/users/entities/user.entity';
import { Campagne } from './entities/campagne.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guards';
import { Roles } from 'src/auth/roles.decorator';
import { PassportModule } from '@nestjs/passport';

@Controller('campagnes')
// ---- Utilise le middleware pour protéger les routes suivantes ---- //
@UseGuards(AuthGuard('jwt'))
export class CampagnesController {
  constructor(private readonly campagnesService: CampagnesService) {}
  // ---- Route qui mènes a la méthode de création de campagne --- //
  @Post()
  // --- Protège son utilisation et determine le role qui peut l'utiliser --- //
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.MJ)
  create(
    // --- Ici mes paramètres nécessaires a son usage --- //
    @Body() createCampagneDto: CreateCampagneDto,
    @GetUser() userConnected: User,
  ): Promise<Campagne> {
    console.log('qui est connecte ? ', userConnected);
    return this.campagnesService.create(createCampagneDto, userConnected);
  }

  // ---- Route qui permet de trouver toutes les campagnes ---- //
  @Get()
  // --- Protège son utilisation et détermine le rôle qui peut l'utiliser --- //
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.MJ)
  findAllCampagne(@GetUser() user: User): Promise<Campagne[]> {
    return this.campagnesService.findAllCampagne(user);
  }

  // ---- Route qui permet de trouver une campagne en particulier ---- //
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Campagne | string> {
    return this.campagnesService.findOne(id, user);
  }

  // ---- Route qui permet de mettre à jour une campagne ---- //
  @Patch(':id')
  // --- Protège son utilisation et détermine le rôle qui peut l'utiliser --- //
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.MJ)
  update(
    @Param('id') id: string,
    @Body() updateCampagneDto: UpdateCampagneDto,
    @GetUser() user: User,
  ): Promise<Campagne | string> {
    return this.campagnesService.update(id, updateCampagneDto, user);
  }

  // ---- Route qui permet de supprimer une campagne ---- //
  @Delete(':id')
  // --- Protège son utilisation et détermine le rôle qui peut l'utiliser --- //
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.MJ)
  remove(
    @Param('id') id: string,
    @Body()
    user: User,
  ) {
    {
      return this.campagnesService.remove(id, user);
    }
  }
}
