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
      return true; 
    }
    
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; 
    if (!user || !user.jobPosition) {
      return false; 
    }

    return allowedPositions.includes(user.jobPosition);
  }
}
