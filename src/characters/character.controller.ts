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
import { AuthGuard } from '@nestjs/passport';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
@Controller('character')
@UseGuards(AuthGuard())
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(
    @Body() createCharacterDto: CreateCharacterDto,
    @GetUser() user: User,
  ): Promise<Character | string> {
    console.log(User);
    return this.characterService.create(createCharacterDto, user);
  }

  @Get()
  findAllByUser(@GetUser() user: User): Promise<Character[]> {
    console.log(Character);
    return this.characterService.findAllCharacter();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Character | string> {
    return this.characterService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @GetUser() user: User,
  ): Promise<Character | string> {
    return this.characterService.update(id, updateCharacterDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.characterService.remove(id, user);
  }
}
