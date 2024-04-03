import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../src/user/entities/user.entity'
import {Form} from '../src/form/entities/form.entity'
import { MerchantID } from 'src/merchantID/merchantID.entity';



@Module({
  imports: [
      TypeOrmModule.forFeature([User, Form, MerchantID]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          password: 'admin',
          username: 'postgres',
          database: 'BMP_DB',
          entities: [User, Form, MerchantID],
          synchronize: true,
          // logging: true,
        }),
      ],
      exports: [TypeOrmModule],
})
export class DatabaseModule {}
