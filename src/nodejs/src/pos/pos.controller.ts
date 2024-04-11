import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { PosService } from "./pos.services";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { createPosDto } from "./createPOS.dto";
import { updatePosStatusDto } from "./updateStatus.dto";

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
    @Get('allrequest')
    async getPosRequest(){
        return this.PosService.getAllPosRequests();
    }

    @ApiTags('PosRequest')
    @Put('updatestatus/:requestId')
    async updateStatus(@Param('requestId') requestId: string, @Body() dto: updatePosStatusDto){
        return this.PosService.updateStatus(requestId, dto);
    }
}