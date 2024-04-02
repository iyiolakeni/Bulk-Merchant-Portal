import { SetMetadata } from "@nestjs/common";
import { JobPosition } from "src/user/entities/user.enum";

export const ROLE_KEY = 'role';
export const Roles = (...roles: JobPosition[]) => SetMetadata(ROLE_KEY, roles);
