import { Body, Controller, Get, Post } from "@nestjs/common";
import { PosService } from "./pos.services";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { createPosDto } from "./createPOS.dto";

@Controller('POS')
export class PosController{
    constructor(private readonly PosService: PosService){}
    
    //Create POS Request
    @ApiTags('PosRequest')
    @ApiBody({type: createPosDto})
    @Post('newposrequest')
    async createPosRequest(@Body() dto: createPosDto){
        return this.PosService.createPosRequest(dto);
    }

    @ApiTags('PosRequest')
    @Get()
    async getPosRequest(){
        return this.PosService.getAllPosRequests();
    }
}