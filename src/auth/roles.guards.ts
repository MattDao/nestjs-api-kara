import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnumType } from 'src/users/entities/user.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // --- Méthode pour vérifier si l'utilisateur a le rôle nécessaire pour accéder à une route --- //
  canActivate(context: ExecutionContext): boolean {
    // --- Obtient les rôles requis à partir du décorateur --- //
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnumType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    // --- Obtient l'utilisateur connecté dans la requête --- //
    const { user } = context.switchToHttp().getRequest();
    // --- Vérifie si l'utilisateur a le rôle requis pour accéder à la route --- //
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
