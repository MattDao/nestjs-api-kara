import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
    name: string;
    imgBackground: string;
    imgCharacter: string;
    strenght: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    charisma: number;
    luck: number;
    stealth: number;
    magic: number;

}
