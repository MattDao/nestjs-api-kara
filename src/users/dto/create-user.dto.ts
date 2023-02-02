import { RoleEnumType } from "../entities/user.entity";

export class CreateUserDto {
    pseudo: string;
    email: string;
    password: string;
    role: RoleEnumType;
}
