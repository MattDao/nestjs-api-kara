import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

// --- Classe et propriétés nécessaire à la mise à jour d'un compte --- //
export class UpdateUserDto extends PartialType(CreateAuthDto) {
  pseudo?: string;
  email?: string;
  password?: string;
}
