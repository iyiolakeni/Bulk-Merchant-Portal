import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFormStatusDto } from './dto/update-form-status.dto';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';
import { FormStatus } from './entities/form.enum';


@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async createForm(formData: CreateFormDto): Promise<Form> {
    const form = this.formRepository.create(formData);
    return this.formRepository.save(form);
  }

  async getAllForms(): Promise<Form[]> {
    return this.formRepository.find();
  }

  async getFormsByMerchantId(MerchantID: string): Promise<Form[]> {
    return this.formRepository.find({ where: { MerchantID: MerchantID } });
  }

  async updateFormStatus(
    MerchantID: string,
    updateFormStatusDto: UpdateFormStatusDto,
  ): Promise<Form> {
    const form = await this.formRepository.findOne({ where: { MerchantID } });
    if (!form) {
      throw new NotFoundException('Form not found');
    }

    if (form.status !== FormStatus.PENDING) {
      throw new BadRequestException('Form status cannot be updated');
    }

    form.status = updateFormStatusDto.status;
    return this.formRepository.save(form);
  }
}
