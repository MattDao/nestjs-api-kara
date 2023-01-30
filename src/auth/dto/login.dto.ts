import { RoleEnumType } from "src/users/entities/user.entity";

export class LoginDto {
    pseudo: string;
    email: string;
    password: string;
    role: RoleEnumType;
}