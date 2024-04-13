
import { DatabaseModule } from 'database/database.module';
import { Module} from '@nestjs/common';
import { EmailController } from 'src/email/email.controller';
import { EmailService } from 'src/email/email.service';



@Module({
  imports: [DatabaseModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {
}
