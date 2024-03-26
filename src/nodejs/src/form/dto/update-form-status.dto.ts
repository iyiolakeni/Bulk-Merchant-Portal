import { ApiProperty } from '@nestjs/swagger';
import { FormStatus } from '../entities/form.enum';

export class UpdateFormStatusDto {
  @ApiProperty({
    enum: [FormStatus.APPROVED, FormStatus.DENIED],
    example: FormStatus.APPROVED,
    description: 'New status for the form (APPROVED or DENIED)',
  })
  status: FormStatus;
}
