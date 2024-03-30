import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../src/user/entities/user.entity'
<<<<<<< HEAD
import {Form} from '../src/form/entities/form.entity'
=======
import { Form } from 'src/form/entities/form.entity';
>>>>>>> 0baff52ebf1709c386a17c02df6d639deb6ef7fd


@Module({
  imports: [
      TypeOrmModule.forFeature([User, Form]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          password: 'admin',
          username: 'postgres',
          database: 'BMP_DB',
          entities: [User, Form],
          synchronize: true,
          // logging: true,
        }),
      ],
      exports: [TypeOrmModule],
})
export class DatabaseModule {}
