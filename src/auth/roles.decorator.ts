import { SetMetadata } from '@nestjs/common';
import { RoleEnumType } from 'src/users/entities/user.entity';

// --- Début de la mise en place des rôles (user, mj)
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnumType[]) =>
  SetMetadata(ROLES_KEY, roles);
