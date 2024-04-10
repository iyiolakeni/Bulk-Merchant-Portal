import { Controller } from "@nestjs/common";
import { PosService } from "./pos.services";

@Controller('POS')
export class PosController{
    constructor(private readonly PosService: PosService){}
    
}