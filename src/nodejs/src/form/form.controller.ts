import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { Form } from './entities/form.entity';
import { ApiTags } from '@nestjs/swagger';
import { JobPosition } from 'src/user/entities/user.enum';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @ApiTags('Form')
  createForm(@Body() formData: CreateFormDto): Promise<Form> {
    return this.formService.createForm(formData);
  }

  @Get()
  @ApiTags('Form')
  getAllForms(): Promise<Form[]> {
    return this.formService.getAllForms();
  }

  @Get(':MerchantID')
  @ApiTags('Form')
  getFormsByMerchantId(@Param('MerchantID') MerchantID: string): Promise<Form[]> {
    return this.formService.getFormsByMerchantId(MerchantID);
  }

  @Patch(':MerchantID/status')
  @ApiTags('Form')
  updateFormStatus(
    @Param('MerchantID') MerchantID: string,
    @Body() updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    return this.formService.updateFormStatus(MerchantID, updateFormStatusDto);
  }
}
