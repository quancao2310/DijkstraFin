import { Module } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { RecordsController } from "./records.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Record, RecordSchema } from "./schemas/record.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService],
  exports: [RecordsService],
})
export class RecordsModule {}
