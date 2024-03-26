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
  Merchant_Trade_Name: string;

  @Column()
  Business_type: string;

  @Column()
  Business_location: string;
  
  @Column()
  Rc_Number: number;

  @Column()
  No_of_branches: number;

  @Column()
  opening_hours: string;

  @Column()
  website: string;

  @Column()
  Office_address: string;

  @Column()
  LGA: string;

  @Column()
  state: string;

  @Column()
  Name_of_Primary_Contact: string;

  @Column()
  Designation: string;

  @Column()
  office_No: number;

  @Column()
  mobile_No: number;

  @Column()
  email: string;

  @Column()
  Name_of_Secondary_Contact: string;

  @Column()
  Secondary_Designation: string;

  @Column()
  Secondary_office_No: number;

  @Column()
  Secondary_mobile_No: number;

  @Column()
  Secondary_email: string;

  @Column()
  No_of_POS_terminal: number;

  @Column()
  location_of_terminal: string;

  @Column()
  contact_person: string;

  @Column()
  contact_mobile_no: string;

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

