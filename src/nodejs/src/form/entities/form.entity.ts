import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FormStatus } from './form.enum';
import { CardType } from './card.enum';
import { POS } from './pos.enum';
import { CategoryBusinessType } from './cate-business.enum';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  MerchantID: string;

  @Column()
  No_of_POS_terminal: number;

  //Location of terminal is to be a list of locations
  @Column('simple-array')
  location_of_terminal: string[];

  @Column('simple-array')
  contact_person: string[];

  @Column('simple-array')
  contact_mobile_no: string[];

  @Column({ type: 'enum', enum:CategoryBusinessType, default:CategoryBusinessType.STORE })
  category_of_merchant_business:CategoryBusinessType;

  @Column()
  bank: string;

  @Column()
  Account_No: number;

  @Column({ type: 'enum', enum:   CardType, default: CardType.LOCAL })
  cardtype: CardType;

  @Column({type: 'enum', enum: POS, default: POS.AIRTIME_VENDING})
  POS_Use: POS;

  @Column({ type: 'enum', enum: FormStatus, default: FormStatus.PENDING })
  status: FormStatus;
}

//32 columns

