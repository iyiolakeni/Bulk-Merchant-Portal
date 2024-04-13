import { FormService } from './form.service';
import { FormController } from './form.controller';
import { DatabaseModule } from 'database/database.module';
import { Module,  MiddlewareConsumer } from '@nestjs/common';
import { LoginService } from 'src/login-api/login-api.service';
import { EmailController } from 'src/email/email.controller';
import { EmailService } from 'src/email/email.service';



@Module({
  imports: [DatabaseModule],
  controllers: [FormController,EmailController],
  providers: [FormService,LoginService,EmailService],
})
export class FormModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(BusinessDeveloperMiddleware)
  //     .forRoutes(FormController); 
  //   consumer
  //     .apply(AccountOfficerMiddleware)
  //     .forRoutes(FormController); 
  // }
}
