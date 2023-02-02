import { PartialType } from '@nestjs/mapped-types';
import { RoleEnumType } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    pseudo: string;
    email: string;
    password: string;
    role: RoleEnumType;
}
