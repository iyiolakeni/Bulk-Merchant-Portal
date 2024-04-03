import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { Form } from './entities/form.entity';
import { ApiTags } from '@nestjs/swagger';
import { AccountOfficerGuard } from './guard/account-officer.guard';
import { BusinessDeveloperGuard } from './guard/business-developer.guard';



@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('new')
  @Post()
  // @UseGuards(AccountOfficerGuard)
  @ApiTags('Form')
  createForm(@Body() formData: CreateFormDto): Promise<Form> {
    return this.formService.createForm(formData);
  }

  @Get()
  // @UseGuards(BusinessDeveloperGuard)
  @ApiTags('Form')
  getAllForms(): Promise<Form[]> {
    return this.formService.getAllForms();
  }

  @Get(':MerchantID')
  // @UseGuards(BusinessDeveloperGuard)
  @ApiTags('Form')
  getFormsByMerchantId(@Param('MerchantID') MerchantID: string): Promise<Form[]> {
    return this.formService.getFormsByMerchantId(MerchantID);
  }

  @Patch(':MerchantID/status')
  @UseGuards(BusinessDeveloperGuard)
  @ApiTags('Form')
  updateFormStatus(
    @Param('MerchantID') MerchantID: string,
    @Body() updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    return this.formService.updateFormStatus(MerchantID, updateFormStatusDto);
  }
}
