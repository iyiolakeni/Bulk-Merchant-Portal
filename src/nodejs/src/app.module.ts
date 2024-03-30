import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {DatabaseModule} from '../database/database.module'
import { LoginApiModule } from './login-api/login-api.module';
import { FormModule } from './form/form.module';
import { AccessContorlService } from './form/access-contorl/access-contorl.service';

@Module({
  imports:[
            DatabaseModule,
            LoginApiModule,
            FormModule
          ],
  controllers: [UserController],
  providers: [UserService, AccessContorlService],
})
export class AppModule {}