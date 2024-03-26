import { SetMetadata, BadRequestException } from '@nestjs/common';
<<<<<<< HEAD
import { JobPosition } from 'src/user/entities/user.entity';

=======
import { JobPosition } from 'src/user/entities/user.enum';
>>>>>>> b8e47f27de74a7f731df044899426605757770ac
export const AllowedPositions = (...positions: JobPosition[]) => {
  if (!positions.every(position => typeof position === 'string')) {
    throw new BadRequestException('Allowed positions must be of type Job Position');
  }
  return SetMetadata('allowedPositions', positions);
};
