import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';
import { ROLES_KEY } from 'src/shared/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Agar route @Roles() bilan belgilanmagan bo‘lsa, o‘taveradi
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Token to‘g‘ri tekshirilmagan bo‘lsa
    if (!user) {
      throw new ForbiddenException('User not found in request (AuthGuard missing)');
    }

    // Ba’zi loyihalarda user.role bitta qiymat bo‘ladi
    const userRoles = Array.isArray(user.roles) ? user.roles : [user.role];

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }
}