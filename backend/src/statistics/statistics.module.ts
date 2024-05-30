import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { StatisticsController } from "./statistics.controller";
import { CategoriesModule } from "../categories/categories.module";
import { MoneySourcesModule } from "../money-sources/money-sources.module";
import { RecordsModule } from "../records/records.module";

@Module({
  imports: [CategoriesModule, MoneySourcesModule, RecordsModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
