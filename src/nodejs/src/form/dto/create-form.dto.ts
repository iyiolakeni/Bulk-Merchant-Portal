import { IsEmail, IsEnum, IsInt} from 'class-validator';
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
  @IsInt()
   No_of_POS_terminal: number;

  @ApiProperty()
  location_of_terminal: string[];


  @ApiProperty()
  contact_person: string[];

  @ApiProperty()
  contact_mobile_no: string[];
  
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