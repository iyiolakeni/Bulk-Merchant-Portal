import { Module } from "@nestjs/common";
import { DatabaseModule } from "database/database.module";
import { MerchantIDController } from "./merchant-id.controller";
import { MerchantIDService } from "./merchant-id.services";

@Module({
    imports: [DatabaseModule],
    controllers: [MerchantIDController],
    providers: [MerchantIDService]
})
export class MerchantIDModule{}