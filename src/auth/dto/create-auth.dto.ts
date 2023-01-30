import { RoleEnumType } from "src/users/entities/user.entity";

// --- Classe et propriétés nécessaire à la création d'un compte --- //
export class CreateAuthDto {
    pseudo: string;
    email: string;
    password: string;
    role: RoleEnumType;
}
