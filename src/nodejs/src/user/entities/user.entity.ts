import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { JobPosition } from './user.enum';
import * as bcrypt from 'bcryptjs';

@Entity('user_table')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

    async setPassword(rawPassword: string) {
    this.password = await bcrypt.hash(rawPassword, 10); 
  }

  async comparePassword(rawPassword: string) {
    return await bcrypt.compare(rawPassword, this.password); 
  }

  @Column({
    type: 'enum',
    enum: JobPosition,
    default: JobPosition.ACCOUNT_OFFICER
  })
  jobPosition: JobPosition;
}
// export { JobPosition };

