import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MoneySource, MoneySourceSchema } from "./schemas/money-source.schema";
import { MoneySourcesController } from "./money-sources.controller";
import { MoneySourcesService } from "./money-sources.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoneySource.name, schema: MoneySourceSchema },
    ]),
  ],
  controllers: [MoneySourcesController],
  providers: [MoneySourcesService],
  exports: [MoneySourcesService],
})
export class MoneySourcesModule {}
