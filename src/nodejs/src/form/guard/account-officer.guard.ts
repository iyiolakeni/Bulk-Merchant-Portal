import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JobPosition } from 'src/user/entities/user.enum';

@Injectable()
export class AccountOfficerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole: JobPosition = request.headers['user-role'] as JobPosition;
    return userRole === JobPosition.ACCOUNT_OFFICER;
  }
}
