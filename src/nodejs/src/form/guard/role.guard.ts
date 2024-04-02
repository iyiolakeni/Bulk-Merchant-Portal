import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorator/role.decorator';
import { JobPosition } from 'src/user/entities/user.enum';
import { AccessControlService } from '../accesscontrol/access-control.service';

export class TokenDTO{
    id: number;
    role: JobPosition;
}

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private  accessControlService: AccessControlService,
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const requiredRoles = this.reflector.getAllAndOverride<JobPosition[]>(ROLE_KEY , [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();
        const token = request['token'] as TokenDTO;

        for (let role of requiredRoles){
            const result = this.accessControlService.isAuthourized({
                requiredRole: role,
                currentRole: token.role,
            });

            if (!result) {
                return true;
            }
        }
        return false;
        }

}