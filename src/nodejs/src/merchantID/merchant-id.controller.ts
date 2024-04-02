import { Body, Controller, Post } from "@nestjs/common";
import { MerchantIDService } from "./merchant-id.services";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { createMerchantIdDto } from "./createMerchantID.dto";

@Controller('merchant')
export class MerchantIDController{
    constructor(private readonly  merchantIdService: MerchantIDService) {}

    // Create Merchant ID and details
    @ApiTags('MerchantID')
    @ApiBody({type: createMerchantIdDto})
    @Post('newMerchant')
    async createMerchantID(@Body() dto: createMerchantIdDto) {
        return this.merchantIdService.newMerchant(dto);
      }
}