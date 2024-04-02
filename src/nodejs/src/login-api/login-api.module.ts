import { Module } from '@nestjs/common';
import { LoginService } from './login-api.service';
import { LoginController } from './login-api.controller';
import { DatabaseModule } from 'database/database.module';



@Module({imports: [
  DatabaseModule,
  // PassportModule.register({ defaultStrategy: 'jwt' }),
  // JwtModule.register({

  //   secret: 'sdijsodnoefuidnjoewdji3989q0oqwjdsoohcdewjd0e90cihcdsdciofiu',
  
  //   signOptions: { expiresIn: '60s' }
  
  // })
],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginApiModule {}
