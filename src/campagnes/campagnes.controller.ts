import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampagnesService } from './campagnes.service';
import { CreateCampagneDto } from './dto/create-campagne.dto';
import { UpdateCampagneDto } from './dto/update-campagne.dto';

@Controller('campagnes')
export class CampagnesController {
  constructor(private readonly campagnesService: CampagnesService) {}

  @Post()
  create(@Body() createCampagneDto: CreateCampagneDto) {
    return this.campagnesService.create(createCampagneDto);
  }

  @Get()
  findAll() {
    return this.campagnesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campagnesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampagneDto: UpdateCampagneDto) {
    return this.campagnesService.update(+id, updateCampagneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campagnesService.remove(+id);
  }
}
