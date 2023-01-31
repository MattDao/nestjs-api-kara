import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Campagne } from 'src/campagnes/entities/campagne.entity';
import { User } from 'src/users/entities/user.entity';
import { DicesService } from './dices.service';
import { CreateDiceDto } from './dto/create-dice.dto';
import { UpdateDiceDto } from './dto/update-dice.dto';
import { Dice } from './entities/dice.entity';
@Controller('dices')
@UseGuards(AuthGuard())
export class DicesController {
  constructor(private readonly dicesService: DicesService) {}

  @Post()
  create(
    @Body() createDiceDto: CreateDiceDto,
    @GetUser() campagne: Campagne
  ): Promise<Dice | string> {
    return this.dicesService.create(createDiceDto, campagne);
  }

  @Get()
  findAllDicesByUser(
    @GetUser() campagne: Campagne,
  ): Promise<Dice[]>{
    return this.dicesService.findAllDicesByCampagne(campagne);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() campagne: Campagne,
    ): Promise<Dice | string> {
    return this.dicesService.findOne(id,campagne);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
     @Body() updateDiceDto: UpdateDiceDto,
     @GetUser() campagne : Campagne
     ):Promise<Dice | string> {
    return this.dicesService.update(id, updateDiceDto, campagne);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body()
   campagne : Campagne,
    ) {
    return this.dicesService.remove(id, campagne);
  }
}
