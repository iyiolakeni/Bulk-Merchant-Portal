import { Module } from '@nestjs/common';
import { LoginService } from './login-api.service';
import { LoginController } from './login-api.controller';
import { DatabaseModule } from 'database/database.module';

@Module({imports: [DatabaseModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginApiModule {}
