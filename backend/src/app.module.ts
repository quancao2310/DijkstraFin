import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "./cats/cats.module";
import { GoalsModule } from "./goals/goals.module";
import { RecordsModule } from "./records/records.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DB_URI || "mongodb://127.0.0.1:27017/DijkstraFin"
    ),
    CatsModule,
    GoalsModule,
    RecordsModule,
  ],
})
export class AppModule {}
