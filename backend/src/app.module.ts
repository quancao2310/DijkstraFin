import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { GoalsModule } from "./goals/goals.module";
import { RecordsModule } from "./records/records.module";
import { MoneySourceModule } from "./money-sources/money-sources.module";
import { CategoriesModule } from "./categories/categories.module";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DB_URI || "mongodb://127.0.0.1:27017/DijkstraFin"
    ),
    GoalsModule,
    RecordsModule,
    MoneySourceModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
