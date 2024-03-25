import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { FormService } from './form.service';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('Form')
  createForm(@Body() formData: CreateFormDto): Promise<Form> {
    return this.formService.createForm(formData);
  }

  @Get()
  getAllForms(): Promise<Form[]> {
    return this.formService.getAllForms();
  }

  @Get(':MerchantID')
  getFormsByMerchantId(@Param('MerchantID') MerchantID: string): Promise<Form[]> {
    return this.formService.getFormsByMerchantId(MerchantID);
  }

  @Patch(':MerchantID/status')
  updateFormStatus(
    @Param('MerchantID') MerchantID: string,
    @Body() updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    return this.formService.updateFormStatus(MerchantID, updateFormStatusDto);
  }
}
