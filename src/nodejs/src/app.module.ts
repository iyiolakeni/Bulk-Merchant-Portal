import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {DatabaseModule} from '../database/database.module'
import { LoginApiModule } from './login-api/login-api.module';
import { FormModule } from './form/form.module';

@Module({
  imports:[
            DatabaseModule,
            LoginApiModule,
            FormModule
          ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}