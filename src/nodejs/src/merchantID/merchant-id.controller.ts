import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post } from "@nestjs/common";
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

    //Get All Merchants details
    @ApiTags('MerchantID')
    @Get('allMerchants')
    async findAllMerchant(){
    return this.merchantIdService.findAllMerchantID();
    }

      @ApiTags('MerchantID')
      @Get(':merchantID')
      async findOneMerchant(@Param('merchantID') merchantID: string) {
        try {
          const merchant = await this.merchantIdService.findOneMerchantID(merchantID);
      
          if (!merchant) {
            throw new NotFoundException(`Merchant with ID ${merchantID} not found`);
          }
      
          return merchant;
        } catch (error) {
          throw new InternalServerErrorException(error.message);
        }
      }
}