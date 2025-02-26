import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wp } from "./wp.entity";
import { WpService } from "./wp.service";
import { WpController } from "./wp.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Wp])],
    providers: [WpService],
    controllers: [WpController],
    exports: [WpService],
})
export class WpModule {}