import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { Form } from './entities/form.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from 'src/login-api/login-api.service';





@Controller('forms')
export class FormController {
  constructor(
    private readonly formService: FormService,
    private readonly loginService: LoginService,

    ) {}

  @Post('new')
  @Post()
  @ApiTags('Form')
  createForm(@Body() formData: CreateFormDto): Promise<Form> {
    return this.formService.createForm(formData);
  }

  @Get()
  @UseGuards()
  @ApiTags('Form')
  getAllForms(): Promise<Form[]> {
    return this.formService.getAllForms();
  }

  @ApiTags('Form')
  @Get(':requestId')
  getFormByRequestID(@Param('requestId') requestId: string){
    console.log(requestId)
    return this.formService.getFormByRequestId(requestId);
  }


  @Patch(':MerchantID/status')
  @UseGuards()
  @ApiTags('Form')
  updateFormStatus(
    @Param('MerchantID') MerchantID: string,
    @Body() updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    return this.formService.updateFormStatus(MerchantID, updateFormStatusDto);
  }
}
