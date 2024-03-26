import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JobPositionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const allowedPositions = this.reflector.get<string[]>('allowedPositions', context.getHandler());
    if (!allowedPositions) {
      return true; // If no allowed positions specified, allow access by default
    }
    
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Assuming user information is available in the request

    if (!user || !user.jobPosition) {
      return false; // If user or job position is not available, deny access
    }

    return allowedPositions.includes(user.jobPosition);
  }
}
