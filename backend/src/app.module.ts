import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from "./categories/categories.module";
import { MoneySourcesModule } from "./money-sources/money-sources.module";
import { GoalsModule } from "./goals/goals.module";
import { BudgetsModule } from "./budgets/budgets.module";
import { RecordsModule } from "./records/records.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DB_URI || "mongodb://127.0.0.1:27017/DijkstraFin"
    ),
    AuthModule,
    UsersModule,
    CategoriesModule,
    MoneySourcesModule,
    GoalsModule,
    BudgetsModule,
    RecordsModule,
  ],
})
export class AppModule {}
