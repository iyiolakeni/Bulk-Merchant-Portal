import { SetMetadata, BadRequestException } from '@nestjs/common';
import { JobPosition } from 'src/user/entities/user.enum';
export const AllowedPositions = (...positions: JobPosition[]) => {
  if (!positions.every(position => typeof position === 'string')) {
    throw new BadRequestException('Allowed positions must be of type Job Position');
  }
  return SetMetadata('allowedPositions', positions);
};
