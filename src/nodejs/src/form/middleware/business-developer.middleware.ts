import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JobPosition } from 'src/user/entities/user.enum';

@Injectable()
export class BusinessDeveloperMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userRole: JobPosition = req.headers['user-role'] as JobPosition;
    if (userRole === JobPosition.BUSINESS_DEVELOPER) {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden' });
    }
  }
}
