import { Role } from '@/api/user/user.enum';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const contextType = context.getType();
    let request: FastifyRequest;

    if (contextType === 'rpc') {
      const gqlCtx = GqlExecutionContext.create(context);
      request = gqlCtx.getContext()?.req;
    } else {
      request = context.switchToHttp().getRequest();
    }

    const session = request['session'];

    if (!session?.user) {
      throw new ForbiddenException('Access denied: No user session');
    }

    const userRole = session.user.role as Role;

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        `Access denied: Requires one of roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
