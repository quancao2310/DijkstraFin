import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MoneySource, MoneySourceSchema } from "./schemas/money-source.schema";
import { MoneySourceController } from "./money-sources.controller";
import { MoneySourceService } from "./money-sources.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoneySource.name, schema: MoneySourceSchema },
    ]),
  ],
  controllers: [MoneySourceController],
  providers: [MoneySourceService],
  exports: [MoneySourceService],
})
export class MoneySourceModule {}
