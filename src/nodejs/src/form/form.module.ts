import { FormService } from './form.service';
import { FormController } from './form.controller';
import { DatabaseModule } from 'database/database.module';
import { Module,  MiddlewareConsumer } from '@nestjs/common';
import { BusinessDeveloperMiddleware } from './middleware/business-developer.middleware';
import { AccountOfficerMiddleware } from './middleware/account-officer.middleware';
import { AccountOfficerGuard } from './guard/account-officer.guard';
import { BusinessDeveloperGuard } from './guard/business-developer.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [FormController],
  providers: [FormService, AccountOfficerGuard,BusinessDeveloperGuard],
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
