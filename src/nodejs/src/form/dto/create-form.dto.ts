import { IsNotEmpty } from 'class-validator';
import { FormStatus } from '../entities/form.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  


  status: FormStatus = FormStatus.PENDING;
}