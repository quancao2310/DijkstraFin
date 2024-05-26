import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/users.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CategoriesModule } from "../categories/categories.module";
import { BudgetsModule } from "../budgets/budgets.module";
import { MoneySourcesModule } from "../money-sources/money-sources.module";
import { GoalsModule } from "../goals/goals.module";
import { RecordsModule } from "../records/records.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CategoriesModule,
    BudgetsModule,
    MoneySourcesModule,
    GoalsModule,
    RecordsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
