import { FormService } from './form.service';
import { FormController } from './form.controller';
import { DatabaseModule } from 'database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
