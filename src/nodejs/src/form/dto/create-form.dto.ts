import { IsEmail, IsEnum, IsInt, IsNotEmpty} from 'class-validator';
import { FormStatus } from '../entities/form.enum';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CardType } from '../entities/card.enum';
import { CategoryBusinessType } from '../entities/cate-business.enum';
import { POS } from '../entities/pos.enum';

export class CreateFormDto {

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  MerchantID: string;

  @ApiProperty()
  Merchant_Trade_Name: string;

  @ApiProperty()
  Business_type: string;

  @ApiProperty()
  Business_location: string;

  @ApiProperty()
  @IsInt()
  Rc_Number: number;

  @ApiProperty()
  @IsInt()
  No_of_branches: number;

  @ApiProperty()
  opening_hours: string;
  
  @ApiProperty()
  website: string;

  @ApiProperty()
  Office_address:string;

  @ApiProperty()
  LGA: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  Name_of_Primary_Contact: string;

  @ApiProperty()
  Designation: string;

  @ApiProperty()
  @IsInt()
  office_No: number;

  @ApiProperty()
  @IsInt()
  mobile_No: number;

  @ApiProperty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty()
  Name_of_Secondary_Contact: string;

  @ApiProperty()
  Secondary_Designation: string;

  @ApiProperty()
  @IsInt()
  Secondary_office_No: number;

  @ApiProperty()
  @IsInt()
  Secondary_mobile_No: number;

  @ApiProperty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
   Secondary_email: string;

  @ApiProperty()
  @IsInt()
   No_of_POS_terminal: number;

  @ApiProperty()
  location_of_terminal: string;


  @ApiProperty()
  contact_person: string;

  @ApiProperty()
  contact_mobile_no: string;
  
  @ApiProperty()
  @IsEnum(CategoryBusinessType)
  Business_Category: CategoryBusinessType;

  @ApiProperty()
  bank: string;

  @ApiProperty()
  @IsInt()
   Account_No: number;

   @ApiProperty()
   @IsEnum(CardType)
   CardType: CategoryBusinessType;

   @ApiProperty()
   @IsEnum(POS)
   POS:POS;

   @ApiProperty()
   @IsEnum(FormStatus)
   FormStatus: FormStatus;

}