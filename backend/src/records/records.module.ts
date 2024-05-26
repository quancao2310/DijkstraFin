import { Module } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { RecordsController } from "./records.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Record, RecordSchema } from "./schemas/record.schema";
import { CategoriesModule } from "../categories/categories.module";
import { BudgetsModule } from "../budgets/budgets.module";
import { MoneySourcesModule } from "../money-sources/money-sources.module";
import { GoalsModule } from "../goals/goals.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
    CategoriesModule,
    BudgetsModule,
    MoneySourcesModule,
    GoalsModule,
  ],
  controllers: [RecordsController],
  providers: [RecordsService],
  exports: [RecordsService],
})
export class RecordsModule {}
