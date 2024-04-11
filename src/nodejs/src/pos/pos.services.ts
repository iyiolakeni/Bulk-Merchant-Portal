import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { Pos } from "./pos.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createPosDto } from "./createPos.dto";
import { Form } from "src/form/entities/form.entity";
import { randomBytes } from "crypto";
import {updatePosStatusDto} from "./updateStatus.dto";
import { Status } from "./enums/status.enum";

@Injectable()
export class PosService{
    constructor(
        @InjectRepository(Pos)
        private readonly posRepository: Repository<Pos>,
        @InjectRepository(Form)
        private readonly formRepository: Repository<Form>
    ){}

    async generateSerialNumbers(count: number): Promise<string[]> {
        const serialNumbers: string[] = [];

        while (serialNumbers.length < count) {
          // Generate a random 8-byte hexadecimal string
          const serialNumber = randomBytes(8).toString('hex');
    
          // Check if the serial number is already in the array
          if (!serialNumbers.includes(serialNumber)) {
            serialNumbers.push(serialNumber);
          }
        }
    
        return serialNumbers;
      }
    
      async createPosRequest(pos: createPosDto) {
        const findRequestId = await this.formRepository.findOne({where: {RequestId: pos.Pos_RequestId}});
        const serialNumbers = await this.generateSerialNumbers(findRequestId.No_of_POS_terminal);
    
        const newPos = this.posRepository.create({
          ...pos,
          Pos_RequestId: findRequestId.RequestId,
          NumberOfPos: findRequestId.No_of_POS_terminal,
          Pos_SerialNumber: serialNumbers,
        });
    
        await this.posRepository.save(newPos);
        return newPos;
      }

    async getAllPosRequests(): Promise<Pos[]>{
        return this.posRepository.find()
    }

    async updateStatus(requestId: string,
      dto: updatePosStatusDto): Promise<Pos>{
        const form = await this.posRepository.findOne({where: {Pos_RequestId: requestId}});
        if(!form){
          throw new NotFoundException('Form not found');
        }
        if (form.status !== Status.PENDING && form.status !== Status.APPROVED){
          throw new BadRequestException("You can't change this request status");
        }
        if (dto.status !== 'Approved' && dto.status !== 'Rejected' && dto.status !== 'Deployed'){
          throw new BadRequestException('Invalid status transition');
        }
        form.status = dto.status;
        console.log('Form:', form)
        return await this.posRepository.save(form);
    }
    
}