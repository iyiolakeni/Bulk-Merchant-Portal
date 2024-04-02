import { Injectable } from "@nestjs/common";
import { JobPosition } from "src/user/entities/user.enum";

interface IsAuthorizedParams{
    currentRole: JobPosition;
    requiredRole: JobPosition;
}

@Injectable()
export class AccessControlService{
    private hierarchies: Array<Map<string, number>> = [];
    private priority: number = 1;

    constructor(){
        this.buildRoles([JobPosition.ACCOUNT_OFFICER, JobPosition.BUSINESS_DEVELOPER,JobPosition.POS_BUSINESS_OFFICER]);
    }
    
    private buildRoles(roles: JobPosition[]) {
        const hierarchy: Map<string, number> = new Map();
        roles.forEach((role) => {
          hierarchy.set(role, this.priority);
          this.priority++;
        });
        this.hierarchies.push(hierarchy);
      }
    public isAuthourized({currentRole, requiredRole}:IsAuthorizedParams){
        for (let hierachy of this.hierarchies){
            const priority = hierachy.get(currentRole);
            const requiredPriority = hierachy.get(requiredRole);
            if (priority && requiredPriority && priority >= requiredPriority){
                return true;
            }
        }
        return false;
    }
}